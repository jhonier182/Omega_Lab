import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * Modelo de Producto con Sequelize
 */
export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('producto_terminado', 'materia_prima', 'componente'),
    defaultValue: 'producto_terminado',
    allowNull: false
  },
  unidad_medida: {
    type: DataTypes.STRING(50),
    defaultValue: 'un',
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
    allowNull: false
  }
}, {
  tableName: 'productos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['codigo'] },
    { fields: ['tipo'] },
    { fields: ['categoria'] },
    { fields: ['estado'] }
  ]
});

export default Product;

