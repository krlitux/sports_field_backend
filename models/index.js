const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Cancha = require('./cancha');
const Reserva = require('./reserva');
const Proveedor = require('./proveedor');

const db = {
  sequelize,
  Usuario,
  Cancha,
  Reserva,
  Proveedor,
};

// Ejecutar associate() si el modelo la define
Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
