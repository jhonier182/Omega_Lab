import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuración de Sequelize ORM
 * Sincroniza automáticamente las tablas al iniciar
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'plm_lims_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

/**
 * Inicializa la conexión y sincroniza las tablas
 * @param {boolean} force - Si es true, elimina y recrea las tablas (solo desarrollo)
 */
export const initializeDatabase = async (force = false) => {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    // Importar modelos
    const { User } = await import('../models/User.js');
    const { Product } = await import('../models/Product.js');
    const { BOM, BOMItem } = await import('../models/BOM.js');

    // Definir asociaciones
    defineAssociations({ User, Product, BOM, BOMItem });

    // Sincronizar tablas (crear/actualizar según modelos)
    const syncOptions = {
      force: force, // Solo en desarrollo, elimina y recrea
      alter: !force && process.env.NODE_ENV === 'development' // En desarrollo, actualiza sin eliminar
    };

    await sequelize.sync(syncOptions);
    console.log('✅ Tablas sincronizadas correctamente');

    return sequelize;
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    throw error;
  }
};

/**
 * Define las asociaciones entre modelos
 */
const defineAssociations = ({ User, Product, BOM, BOMItem }) => {
  // BOM pertenece a Product
  BOM.belongsTo(Product, {
    foreignKey: 'producto_id',
    as: 'producto'
  });

  // Product tiene muchos BOMs
  Product.hasMany(BOM, {
    foreignKey: 'producto_id',
    as: 'boms'
  });

  // BOMItem pertenece a BOM
  BOMItem.belongsTo(BOM, {
    foreignKey: 'bom_id',
    as: 'bom'
  });

  // BOMItem pertenece a Product (material)
  BOMItem.belongsTo(Product, {
    foreignKey: 'material_id',
    as: 'material'
  });

  // BOM tiene muchos BOMItems
  BOM.hasMany(BOMItem, {
    foreignKey: 'bom_id',
    as: 'items'
  });

  // BOM creado por User
  BOM.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creador'
  });

  // BOM aprobado por User
  BOM.belongsTo(User, {
    foreignKey: 'approved_by',
    as: 'aprobador'
  });
};

export default sequelize;

