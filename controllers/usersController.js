const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Usuarios WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

exports.getUsuarios = async (req, res) => {
    const userRole = req.user.rol;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: solo administradores pueden ver todos los usuarios' });
    }

    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT id, nombre, email, rol FROM Usuarios');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: err });
    }
};

exports.getUsuarioById = async (req, res) => {
    const userIdFromToken = req.user.id;
    const userRole = req.user.rol;
    const userIdFromParams = parseInt(req.params.id, 10);

    if (userRole !== 'admin' && userIdFromToken !== userIdFromParams) {
        return res.status(403).json({ message: 'Acceso denegado: no autorizado' });
    }
    try {
        const { id } = req.params;
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT id, nombre, email, rol FROM Usuarios WHERE id = @id');

        if (result.recordset.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: err });
    }
};

exports.createUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;    
    const rolesPermitidos = ['jugador', 'proveedor'];
    if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({ message: 'Rol no permitido para registro' });
    }
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const pool = await sql.connect();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, passwordHash)
            .input('rol', sql.VarChar, rol)
            .query('INSERT INTO Usuarios (nombre, email, password_hash, rol) VALUES (@nombre, @email, @password, @rol)');
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear usuario', error: err });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, rol } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, passwordHash)
            .input('rol', sql.VarChar, rol)
            .query('UPDATE Usuarios SET nombre = @nombre, email = @email, password_hash = @password, rol = @rol WHERE id = @id');
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: err });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Usuarios WHERE id = @id');
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: err });
    }
};
