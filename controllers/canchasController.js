const sql = require('mssql');

// Obtener todas las canchas
exports.getCanchas = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Canchas');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener canchas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener una cancha por ID
exports.getCanchaById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Canchas WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Cancha no encontrada' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener cancha por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Crear una nueva cancha
exports.createCancha = async (req, res) => {
    const { nombre, ubicacion, descripcion } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('ubicacion', sql.VarChar, ubicacion)
            .input('descripcion', sql.VarChar, descripcion)
            .query('INSERT INTO Canchas (nombre, ubicacion, descripcion) VALUES (@nombre, @ubicacion, @descripcion)');
        
        res.status(201).json({ message: 'Cancha creada correctamente' });
    } catch (error) {
        console.error('Error al crear cancha:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar cancha
exports.updateCancha = async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion, descripcion } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('ubicacion', sql.VarChar, ubicacion)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE Canchas SET nombre = @nombre, ubicacion = @ubicacion, descripcion = @descripcion WHERE id = @id');
        
        res.json({ message: 'Cancha actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar cancha:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar cancha
exports.deleteCancha = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Canchas WHERE id = @id');

        res.json({ message: 'Cancha eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar cancha:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
