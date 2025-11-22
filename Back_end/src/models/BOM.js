import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * Modelo de BOM (Lista de Materiales) con Sequelize
 */
export const BOM = sequelize.define('BOM', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  version: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  estado: {
    type: DataTypes.ENUM('borrador', 'aprobado', 'obsoleto'),
    defaultValue: 'borrador',
    allowNull: false
  },
  justificacion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  approved_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  approved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'boms',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['producto_id'] },
    { fields: ['estado'] },
    { fields: ['version'] },
    { 
      unique: true,
      fields: ['producto_id', 'version'],
      name: 'unique_producto_version'
    }
  ]
});

/**
 * Modelo de Item de BOM (Material en la lista) con Sequelize
 */
export const BOMItem = sequelize.define('BOMItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bom_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'boms',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  cantidad: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: false,
    validate: {
      min: 0.0001
    }
  },
  unidad: {
    type: DataTypes.STRING(50),
    defaultValue: 'mg',
    allowNull: false
  },
  porcentaje: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  secuencia: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'bom_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { fields: ['bom_id'] },
    { fields: ['material_id'] },
    { fields: ['secuencia'] }
  ]
});

export default BOM;

