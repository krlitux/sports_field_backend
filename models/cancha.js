const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Proveedor = require('./proveedor');

const Cancha = sequelize.define('Cancha', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING, // Ej: "Fútbol 5", "Tenis"
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precio_por_hora',
  },
  proveedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Proveedores',
      key: 'id',
    },
  },
}, {
  tableName: 'Canchas',
  timestamps: false,
});

Cancha.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

module.exports = Cancha;
