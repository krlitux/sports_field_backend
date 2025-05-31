const express = require('express');
const router = express.Router();
const controller = require('../controllers/canchasController');
const auth = require('../middleware/auth');

// CRUD protegido por token
router.get('/', auth.verifyToken, controller.getCanchas);
router.get('/:id', auth.verifyToken, controller.getCanchaById);
router.post('/', auth.verifyToken, controller.createCancha);
router.put('/:id', auth.verifyToken, controller.updateCancha);
router.delete('/:id', auth.verifyToken, controller.deleteCancha);

module.exports = router;
