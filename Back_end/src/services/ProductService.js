import { Product } from '../models/Product.js';
import { BOM, BOMItem } from '../models/BOM.js';
import { AppError } from '../utils/errors.js';
import { Op } from 'sequelize';

/**
 * Servicio de Productos
 * Contiene toda la lógica de negocio relacionada con productos y BOM
 */
class ProductService {
  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Product>}
   */
  async createProduct(productData) {
    // Validar que el código no exista
    const codigoExists = await Product.count({
      where: { codigo: productData.codigo }
    });

    if (codigoExists > 0) {
      throw new AppError('El código del producto ya existe', 400);
    }

    // Crear producto
    return await Product.create({
      codigo: productData.codigo,
      nombre: productData.nombre,
      descripcion: productData.descripcion || '',
      categoria: productData.categoria || '',
      tipo: productData.tipo || 'producto_terminado',
      unidad_medida: productData.unidad_medida || 'un',
      estado: 'activo'
    });
  }

  /**
   * Obtiene un producto por ID con su BOM
   * @param {number} id - ID del producto
   * @returns {Promise<Object>}
   */
  async getProductById(id) {
    const product = await Product.findOne({
      where: {
        id,
        estado: 'activo'
      }
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    // Obtener BOM activo con items (primero buscar aprobado, si no hay buscar borrador)
    let bom = await BOM.findOne({
      where: {
        producto_id: id,
        estado: 'aprobado'
      },
      order: [['version', 'DESC']],
      include: [{
        model: BOMItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'material',
          attributes: ['id', 'codigo', 'nombre', 'unidad_medida']
        }],
        order: [['secuencia', 'ASC'], ['id', 'ASC']]
      }]
    });

    // Si no hay BOM aprobado, buscar borrador
    if (!bom) {
      bom = await BOM.findOne({
        where: {
          producto_id: id,
          estado: 'borrador'
        },
        order: [['version', 'DESC']],
        include: [{
          model: BOMItem,
          as: 'items',
          include: [{
            model: Product,
            as: 'material',
            attributes: ['id', 'codigo', 'nombre', 'unidad_medida']
          }],
          order: [['secuencia', 'ASC'], ['id', 'ASC']]
        }]
      });
    }

    return {
      product: product.toJSON(),
      bom: bom ? bom.toJSON() : null
    };
  }

  /**
   * Obtiene todos los productos con filtros
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Promise<Array>}
   */
  async getAllProducts(filters = {}) {
    const where = {
      estado: 'activo'
    };

    if (filters.tipo) {
      where.tipo = filters.tipo;
    }

    if (filters.categoria) {
      where.categoria = filters.categoria;
    }

    if (filters.search) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${filters.search}%` } },
        { codigo: { [Op.like]: `%${filters.search}%` } }
      ];
    }

    const products = await Product.findAll({
      where,
      order: [['nombre', 'ASC']]
    });

    return products.map(p => p.toJSON());
  }

  /**
   * Actualiza un producto
   * @param {number} id - ID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Product>}
   */
  async updateProduct(id, productData) {
    const product = await Product.findOne({
      where: {
        id,
        estado: 'activo'
      }
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    // Si se actualiza el código, verificar que no exista
    if (productData.codigo && productData.codigo !== product.codigo) {
      const codigoExists = await Product.count({
        where: {
          codigo: productData.codigo,
          id: { [Op.ne]: id }
        }
      });

      if (codigoExists > 0) {
        throw new AppError('El código del producto ya existe', 400);
      }
    }

    await product.update(productData);
    return product;
  }

  /**
   * Crea o actualiza el BOM de un producto
   * @param {number} productoId - ID del producto
   * @param {Object} bomData - Datos del BOM
   * @param {number} userId - ID del usuario
   * @returns {Promise<BOM>}
   */
  async createOrUpdateBOM(productoId, bomData, userId) {
    // Verificar que el producto existe
    const product = await Product.findOne({
      where: {
        id: productoId,
        estado: 'activo'
      }
    });

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    // Buscar BOM existente en borrador
    let bom = await BOM.findOne({
      where: {
        producto_id: productoId,
        estado: 'borrador'
      }
    });

    if (!bom) {
      // Obtener última versión para crear nueva
      const lastBom = await BOM.findOne({
        where: { producto_id: productoId },
        order: [['version', 'DESC']]
      });

      const version = lastBom ? this.getNextVersion(lastBom.version) : '1.0';

      // Crear nuevo BOM
      bom = await BOM.create({
        producto_id: productoId,
        version,
        justificacion: bomData.justificacion || '',
        estado: 'borrador',
        created_by: userId
      });
    } else {
      // Actualizar BOM existente
      await bom.update({
        justificacion: bomData.justificacion
      });
    }

    return bom;
  }

  /**
   * Agrega un material al BOM
   * @param {number} bomId - ID del BOM
   * @param {Object} itemData - Datos del item
   * @returns {Promise<BOMItem>}
   */
  async addMaterialToBOM(bomId, itemData) {
    // Verificar que el BOM existe
    const bom = await BOM.findByPk(bomId);
    if (!bom) {
      throw new AppError('BOM no encontrado', 404);
    }

    // Verificar que el material existe
    const material = await Product.findOne({
      where: {
        id: itemData.material_id,
        estado: 'activo'
      }
    });

    if (!material) {
      throw new AppError('Material no encontrado', 404);
    }

    // Obtener siguiente secuencia
    const maxSeq = await BOMItem.max('secuencia', {
      where: { bom_id: bomId }
    });
    const nextSeq = (maxSeq || 0) + 1;

    // Agregar item al BOM
    return await BOMItem.create({
      bom_id: bomId,
      material_id: itemData.material_id,
      cantidad: itemData.cantidad,
      unidad: itemData.unidad || 'mg',
      porcentaje: itemData.porcentaje || 0,
      secuencia: nextSeq
    });
  }

  /**
   * Obtiene el BOM completo con sus items
   * @param {number} bomId - ID del BOM
   * @returns {Promise<Object>}
   */
  async getBOMWithItems(bomId) {
    const bom = await BOM.findByPk(bomId, {
      include: [{
        model: BOMItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'material',
          attributes: ['id', 'codigo', 'nombre', 'unidad_medida']
        }],
        order: [['secuencia', 'ASC'], ['id', 'ASC']]
      }]
    });

    if (!bom) {
      throw new AppError('BOM no encontrado', 404);
    }

    const bomData = bom.toJSON();
    
    // Agregar información del material a cada item para compatibilidad
    if (bomData.items) {
      bomData.items = bomData.items.map(item => ({
        ...item,
        material_nombre: item.material?.nombre,
        material_codigo: item.material?.codigo,
        material_unidad_medida: item.material?.unidad_medida
      }));
    }

    return bomData;
  }

  /**
   * Actualiza un item del BOM
   * @param {number} itemId - ID del item
   * @param {Object} itemData - Datos a actualizar
   * @returns {Promise<BOMItem>}
   */
  async updateBOMItem(itemId, itemData) {
    const item = await BOMItem.findByPk(itemId);
    if (!item) {
      throw new AppError('Item no encontrado', 404);
    }

    await item.update(itemData);
    return item;
  }

  /**
   * Elimina un item del BOM
   * @param {number} itemId - ID del item
   * @returns {Promise<boolean>}
   */
  async deleteBOMItem(itemId) {
    const item = await BOMItem.findByPk(itemId);
    if (!item) {
      throw new AppError('Item no encontrado', 404);
    }

    await item.destroy();
    return true;
  }

  /**
   * Obtiene el historial de versiones del BOM
   * @param {number} productoId - ID del producto
   * @returns {Promise<Array>}
   */
  async getBOMHistory(productoId) {
    const boms = await BOM.findAll({
      where: { producto_id: productoId },
      order: [['version', 'DESC']]
    });

    return boms.map(bom => bom.toJSON());
  }

  /**
   * Crea una nueva versión del BOM
   * @param {number} bomId - ID del BOM actual
   * @param {string} newVersion - Nueva versión
   * @param {number} userId - ID del usuario
   * @returns {Promise<BOM>}
   */
  async createBOMVersion(bomId, newVersion, userId) {
    const oldBom = await BOM.findByPk(bomId, {
      include: [{
        model: BOMItem,
        as: 'items'
      }]
    });

    if (!oldBom) {
      throw new AppError('BOM no encontrado', 404);
    }

    // Crear nuevo BOM
    const newBom = await BOM.create({
      producto_id: oldBom.producto_id,
      version: newVersion,
      justificacion: oldBom.justificacion,
      estado: 'borrador',
      created_by: userId
    });

    // Copiar items del BOM anterior
    for (const item of oldBom.items) {
      await BOMItem.create({
        bom_id: newBom.id,
        material_id: item.material_id,
        cantidad: item.cantidad,
        unidad: item.unidad,
        porcentaje: item.porcentaje,
        secuencia: item.secuencia
      });
    }

    return newBom;
  }

  /**
   * Calcula la siguiente versión
   * @param {string} currentVersion - Versión actual
   * @returns {string}
   */
  getNextVersion(currentVersion) {
    const parts = currentVersion.split('.');
    const major = parseInt(parts[0]) || 1;
    const minor = parseInt(parts[1]) || 0;
    return `${major}.${minor + 1}`;
  }
}

export default new ProductService();
