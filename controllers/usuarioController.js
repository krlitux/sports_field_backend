const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.registrar = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'Email ya registrado' });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password_hash: hash,
      rol: 'jugador',
    });


    res.status(201).json({ mensaje: 'Usuario creado', id: nuevoUsuario.id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(contraseña, usuario.password_hash);
    if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombre', 'email', 'rol']
    });
    if (!usuario) return res.status(404).json({ mensaje: 'No encontrado' });

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener perfil' });
  }
};
