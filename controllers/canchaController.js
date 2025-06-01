const Cancha = require('../models/cancha');

exports.crearCancha = async (req, res) => {
  try {
    const proveedor_id = req.usuario.id; // extraído del token JWT
    const { nombre, direccion, tipo } = req.body;

    const cancha = await Cancha.create({
      nombre,
      direccion,
      tipo,
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
