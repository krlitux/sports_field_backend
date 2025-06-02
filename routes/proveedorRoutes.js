const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Proveedores
 *     description: Operaciones relacionadas con proveedores (Dueños de campos deportivos)
 */

/**
 * @swagger
 * /api/proveedores/register:
 *   post:
 *     summary: Registrar nuevo proveedor
 *     tags:
 *       - Proveedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razon_social
 *               - email
 *               - contraseña
 *             properties:
 *               razon_social:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor creado
 *       400:
 *         description: Email ya registrado
 */
router.post('/register', proveedorController.registrarProveedor);

/**
 * @swagger
 * /api/proveedores/login:
 *   post:
 *     summary: Login de proveedor
 *     tags:
 *       - Proveedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Proveedor no encontrado
 */
router.post('/login', proveedorController.loginProveedor);

/**
 * @swagger
 * /api/proveedores/me:
 *   get:
 *     summary: Ver perfil del proveedor autenticado
 *     tags:
 *       - Proveedores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del proveedor
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('/me', authMiddleware, proveedorController.perfilProveedor);

module.exports = router;
