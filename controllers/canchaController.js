const Cancha = require('../models/cancha');
const { Op } = require('sequelize');

exports.crearCancha = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id; // extraído del token JWT
    const { nombre, direccion, tipo, precio } = req.body;

    const cancha = await Cancha.create({
      nombre,
      direccion,
      tipo,
      precio,  
      proveedor_id,
    });

    res.status(201).json(cancha);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear la cancha', error: err.message });
  }
};

exports.obtenerMisCanchas = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id;

    const canchas = await Cancha.findAll({ where: { proveedor_id } });
    res.json(canchas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener canchas', error: err.message });
  }
};

exports.eliminarCancha = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id;
    const canchaId = req.params.id;

    const cancha = await Cancha.findOne({ where: { id: canchaId, proveedor_id } });
    if (!cancha) return res.status(404).json({ mensaje: 'Cancha no encontrada o acceso denegado' });

    await cancha.destroy();
    res.json({ mensaje: 'Cancha eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar la cancha', error: err.message });
  }
};

exports.editarCancha = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id;
    const canchaId = req.params.id;
    const { nombre, direccion, tipo, precio } = req.body;

    // Buscar solo canchas del proveedor autenticado
    const cancha = await Cancha.findOne({ where: { id: canchaId, proveedor_id } });
    if (!cancha) {
      return res.status(404).json({ mensaje: 'Cancha no encontrada o acceso no autorizado' });
    }

    // Actualizar campos
    cancha.nombre = nombre ?? cancha.nombre;
    cancha.direccion = direccion ?? cancha.direccion;
    cancha.tipo = tipo ?? cancha.tipo;
    cancha.precio = precio ?? cancha.precio;

    await cancha.save();
    res.json({ mensaje: 'Cancha actualizada', cancha });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al editar cancha', error: err.message });
  }
};

exports.listarCanchasDisponibles = async (req, res) => {
  try {
    const { tipo, precio_max } = req.query;

    const where = {};

    if (tipo) {
      where.tipo = tipo;
    }

    if (precio_max) {
      where.precio = { [Op.lte]: precio_max };
    }

    // Si en el futuro hay un campo "aprobada", se puede agregar: where.aprobada = true

    const canchas = await Cancha.findAll({ where });

    res.json(canchas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al listar canchas', error: err.message });
  }
};