const Reserva = require('../models/reserva');
const Cancha = require('../models/cancha');
const { Op } = require('sequelize');

exports.crearReserva = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { cancha_id, fecha, hora_inicio, hora_fin } = req.body;

    const cancha = await Cancha.findByPk(cancha_id);
    if (!cancha) {
      return res.status(404).json({ mensaje: 'Cancha no encontrada' });
    }

    // Verificar si existe una reserva que se superponga con la nueva
    const conflicto = await Reserva.findOne({
      where: {
        cancha_id,
        fecha,
        [Op.or]: [
          {
            hora_inicio: {
              [Op.between]: [hora_inicio, hora_fin]
            }
          },
          {
            hora_fin: {
              [Op.between]: [hora_inicio, hora_fin]
            }
          },
          {
            [Op.and]: [
              { hora_inicio: { [Op.lte]: hora_inicio } },
              { hora_fin: { [Op.gte]: hora_fin } }
            ]
          }
        ]
      }
    });

    if (conflicto) {
      return res.status(409).json({
        mensaje: 'Ya existe una reserva que se superpone con ese horario'
      });
    }

    const reserva = await Reserva.create({
      usuario_id,
      cancha_id,
      fecha,
      hora_inicio,
      hora_fin,
    });

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
      include: [
        {
          model: Cancha,
          as: 'cancha', // debe coincidir con el alias definido en el modelo
          attributes: ['nombre']
        }
      ]
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
