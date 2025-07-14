const { Reserva, Cancha, Usuario } = require('../models');
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
        as: 'cancha',
        attributes: ['nombre', 'direccion']
      }
    ],
    raw: true,
    nest: true,
  });

  const formateadas = reservas.map(r => ({
    ...r,
    hora_inicio: r.hora_inicio instanceof Date ? r.hora_inicio.toTimeString().substring(0, 5) : null,
    hora_fin: r.hora_fin instanceof Date ? r.hora_fin.toTimeString().substring(0, 5) : null,
  }));

  res.json(formateadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: err.message });
  }
};

exports.obtenerReservasProveedor = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id;

    const reservas = await Reserva.findAll({
      include: [
        {
          model: Cancha,
          as: 'cancha',
          where: { proveedor_id },
          attributes: ['nombre', 'direccion']
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nombre']
        }
      ],
      order: [['fecha', 'DESC'], ['hora_inicio', 'ASC']]
    });

    const resultado = reservas.map(r => ({
      cancha: {
        nombre: r.cancha?.nombre,     // 👈 corregido
        direccion: r.cancha?.direccion
      },
      usuario: {
        nombre: r.usuario?.nombre     // 👈 corregido
      },
      fecha: r.fecha,
      hora_inicio: r.hora_inicio instanceof Date
        ? r.hora_inicio.toTimeString().substring(0, 5)
        : r.hora_inicio?.substring(0, 5),
      hora_fin: r.hora_fin instanceof Date
        ? r.hora_fin.toTimeString().substring(0, 5)
        : r.hora_fin?.substring(0, 5),
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas del proveedor', error: err.message });
  }
};

exports.cancelarReserva = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioId = req.usuario.id;

    // Solo permitir cancelar si la reserva le pertenece al usuario
    const reserva = await Reserva.findOne({ where: { id, usuario_id: usuarioId } });

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada o no autorizada' });
    }

    await reserva.destroy();

    res.json({ mensaje: 'Reserva cancelada exitosamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al cancelar la reserva', error: err.message });
  }
};
