const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Reservas
 *     description: Reservas hechas por jugadores y visualización por proveedores
 */

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una reserva (jugador)
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cancha_id, fecha, hora]
 *             properties:
 *               cancha_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', authMiddleware, reservaController.crearReserva);

/**
 * @swagger
 * /api/reservas/mis-reservas:
 *   get:
 *     summary: Ver mis reservas (jugador)
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 */
router.get('/mis-reservas', authMiddleware, reservaController.obtenerMisReservas);

/**
 * @swagger
 * /api/reservas/proveedor:
 *   get:
 *     summary: Ver reservas de mis canchas (proveedor)
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas para las canchas del proveedor autenticado
 */
router.get('/proveedor', authMiddleware, reservaController.obtenerReservasProveedor);

module.exports = router;
