const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Cancha = require('./cancha');
const Reserva = require('./reserva');
const Proveedor = require('./proveedor');

// Definir relaciones entre modelos aquí si es necesario

module.exports = {
  sequelize,
  Usuario,
  Cancha,
  Reserva,
  Proveedor,
};
