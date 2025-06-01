const Reserva = require('../models/reserva');
const Cancha = require('../models/cancha');

exports.crearReserva = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { cancha_id, fecha, hora } = req.body;

    const cancha = await Cancha.findByPk(cancha_id);
    if (!cancha) return res.status(404).json({ mensaje: 'Cancha no encontrada' });

    const reserva = await Reserva.create({ usuario_id, cancha_id, fecha, hora });
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear reserva', error: err.message });
  }
};

exports.obtenerMisReservas = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;

    const reservas = await Reserva.findAll({
      where: { usuario_id },
      include: ['Cancha'],
    });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: err.message });
  }
};

exports.obtenerReservasProveedor = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id;

    const reservas = await Reserva.findAll({
      include: {
        model: Cancha,
        where: { proveedor_id },
      },
    });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas del proveedor', error: err.message });
  }
};
