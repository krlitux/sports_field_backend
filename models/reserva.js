const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cancha = require('./cancha');
const Usuario = require('./usuario');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id',
    },
  },
  cancha_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Canchas',
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Reservas',
  timestamps: false,
});

Reserva.belongsTo(Cancha, { foreignKey: 'cancha_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Reserva;
