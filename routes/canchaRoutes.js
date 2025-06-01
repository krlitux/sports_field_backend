const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/canchaController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloProveedor = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Canchas
 *     description: Gestión de canchas por parte de proveedores
 */

/**
 * @swagger
 * /api/canchas:
 *   post:
 *     summary: Crear nueva cancha
 *     tags: 
 *       - Canchas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, direccion, tipo]
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               tipo:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 1500.0
 *     responses:
 *       201:
 *         description: Cancha creada
 */
router.post('/', authMiddleware, soloProveedor(['proveedor']), canchaController.crearCancha);

/**
 * @swagger
 * /api/canchas:
 *   get:
 *     summary: Obtener canchas del proveedor autenticado
 *     tags: 
 *       - Canchas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de canchas
 */
router.get('/', authMiddleware, canchaController.obtenerMisCanchas);

/**
 * @swagger
 * /api/canchas/{id}:
 *   delete:
 *     summary: Eliminar una cancha por ID (solo del proveedor autenticado)
 *     tags: 
 *       - Canchas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cancha
 *     responses:
 *       200:
 *         description: Cancha eliminada
 *       404:
 *         description: No se encontró o no tiene permisos
 */
router.delete('/:id', authMiddleware, canchaController.eliminarCancha);

module.exports = router;
