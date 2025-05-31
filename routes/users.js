const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const auth = require('../middleware/auth');

// Login
router.post('/login', controller.loginUsuario);

// CRUD protegido por token
router.get('/', auth.verifyToken, controller.getUsuarios);
router.get('/:id', auth.verifyToken, controller.getUsuarioById);
router.post('/', controller.createUsuario); // Puedes proteger esto si lo deseas
router.put('/:id', auth.verifyToken, controller.updateUsuario);
router.delete('/:id', auth.verifyToken, controller.deleteUsuario);

module.exports = router;
