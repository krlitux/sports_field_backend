const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloProveedor = require('../middlewares/roleMiddleware');

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
 * /api/reservas/{id}:
 *   delete:
 *     summary: Cancelar una reserva del jugador autenticado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva cancelada exitosamente
 *       404:
 *         description: Reserva no encontrada o no pertenece al usuario
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authMiddleware, reservaController.cancelarReserva);

/**
 * @swagger
 * /api/reservas/por-proveedor:
 *   get:
 *     summary: Obtener todas las reservas de las canchas del proveedor autenticado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas exitosamente obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cancha:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       direccion:
 *                         type: string
 *                   usuario:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   hora_inicio:
 *                     type: string
 *                   hora_fin:
 *                     type: string
 *       403:
 *         description: Acceso denegado - solo proveedores
 */
router.get('/por-proveedor', authMiddleware, soloProveedor(['proveedor']), reservaController.obtenerReservasProveedor);

module.exports = router;
