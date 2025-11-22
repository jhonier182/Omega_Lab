import ProductService from '../services/ProductService.js';

/**
 * Controlador de Productos
 * Controladores delgados: solo orquestan, la lógica está en los servicios
 */
class ProductController {
  constructor() {
    this.productService = ProductService;
  }

  /**
   * Crea un nuevo producto
   * POST /api/products
   */
  createProduct = async (req, res, next) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: { product: product.toJSON() }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene todos los productos
   * GET /api/products
   */
  getAllProducts = async (req, res, next) => {
    try {
      const filters = {
        tipo: req.query.tipo,
        categoria: req.query.categoria,
        search: req.query.search
      };
      const products = await this.productService.getAllProducts(filters);
      res.status(200).json({
        success: true,
        data: { products }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene un producto por ID con su BOM
   * GET /api/products/:id
   */
  getProductById = async (req, res, next) => {
    try {
      const data = await this.productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Actualiza un producto
   * PUT /api/products/:id
   */
  updateProduct = async (req, res, next) => {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: { product: product.toJSON() }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Crea o actualiza el BOM de un producto
   * POST /api/products/:id/bom
   */
  createOrUpdateBOM = async (req, res, next) => {
    try {
      const bom = await this.productService.createOrUpdateBOM(
        req.params.id,
        req.body,
        req.user.id
      );
      res.status(200).json({
        success: true,
        data: { bom: bom.toJSON() }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Agrega un material al BOM
   * POST /api/products/boms/:bomId/items
   */
  addMaterialToBOM = async (req, res, next) => {
    try {
      const item = await this.productService.addMaterialToBOM(req.params.bomId, req.body);
      res.status(201).json({
        success: true,
        data: { item: item.toJSON() }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene el BOM completo con sus items
   * GET /api/products/boms/:bomId
   */
  getBOMWithItems = async (req, res, next) => {
    try {
      const bom = await this.productService.getBOMWithItems(req.params.bomId);
      res.status(200).json({
        success: true,
        data: { bom }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Actualiza un item del BOM
   * PUT /api/products/bom-items/:itemId
   */
  updateBOMItem = async (req, res, next) => {
    try {
      const item = await this.productService.updateBOMItem(req.params.itemId, req.body);
      res.status(200).json({
        success: true,
        data: { item: item.toJSON() }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Elimina un item del BOM
   * DELETE /api/products/bom-items/:itemId
   */
  deleteBOMItem = async (req, res, next) => {
    try {
      await this.productService.deleteBOMItem(req.params.itemId);
      res.status(200).json({
        success: true,
        message: 'Item eliminado correctamente'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene el historial de versiones del BOM
   * GET /api/products/:id/bom/history
   */
  getBOMHistory = async (req, res, next) => {
    try {
      const history = await this.productService.getBOMHistory(req.params.id);
      res.status(200).json({
        success: true,
        data: { history }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
