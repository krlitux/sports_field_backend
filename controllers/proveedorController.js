const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Proveedor = require('../models/proveedor');

exports.registrarProveedor = async (req, res) => {
  const { razon_social, email, contraseña } = req.body;
  try {
    const existe = await Proveedor.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'El email ya está en uso' });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoProveedor = await Proveedor.create({
      razon_social,
      email,
      password_hash: hash,
    });

    res.status(201).json({ mensaje: 'Proveedor creado', id: nuevoProveedor.id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar proveedor', error: err.message });
  }
};

exports.loginProveedor = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const proveedor = await Proveedor.findOne({ where: { email } });
    if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });

    const valido = await bcrypt.compare(contraseña, proveedor.password_hash);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: proveedor.id, email: proveedor.email, rol: 'proveedor' },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
  }
};

exports.perfilProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.usuario.id, {
      attributes: ['id', 'razon_social', 'email']
    });
    if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });

    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener el perfil' });
  }
};
