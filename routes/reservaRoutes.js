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
 *     description: Crea una reserva si la cancha está disponible en el horario solicitado.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cancha_id
 *               - fecha
 *               - hora_inicio
 *               - hora_fin
 *             properties:
 *               cancha_id:
 *                 type: integer
 *                 description: ID de la cancha a reservar
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva
 *                 example: "2025-06-01"
 *               hora_inicio:
 *                 type: string
 *                 format: time
 *                 description: Hora de inicio en formato HH:mm
 *                 example: "18:00"
 *               hora_fin:
 *                 type: string
 *                 format: time
 *                 description: Hora de fin en formato HH:mm
 *                 example: "19:00"
 *     responses:
 *       201:
 *         description: Reserva creada con éxito
 *       409:
 *         description: Ya existe una reserva en ese horario
 *       404:
 *         description: Cancha no encontrada
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
