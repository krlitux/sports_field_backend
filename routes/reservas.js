const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservasController');
const auth = require('../middleware/auth');

// CRUD protegido por token
router.get('/', auth.verifyToken, controller.getReservas);
router.get('/:id', auth.verifyToken, controller.getReservaById);
router.post('/', auth.verifyToken, controller.createReserva);
router.put('/:id', auth.verifyToken, controller.updateReserva);
router.delete('/:id', auth.verifyToken, controller.deleteReserva);

module.exports = router;
