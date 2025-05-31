const sql = require('mssql');

// Obtener todas las reservas
exports.getReservas = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Reservas');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Reservas WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener reserva:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
    const { cancha_id, usuario_id, fecha_reserva, hora_inicio, hora_fin } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('cancha_id', sql.Int, cancha_id)
            .input('usuario_id', sql.Int, usuario_id)
            .input('fecha_reserva', sql.Date, fecha_reserva)
            .input('hora_inicio', sql.Time, hora_inicio)
            .input('hora_fin', sql.Time, hora_fin)
            .query(`
                INSERT INTO Reservas (cancha_id, usuario_id, fecha_reserva, hora_inicio, hora_fin)
                VALUES (@cancha_id, @usuario_id, @fecha_reserva, @hora_inicio, @hora_fin)
            `);
        res.status(201).json({ message: 'Reserva creada correctamente' });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar reserva
exports.updateReserva = async (req, res) => {
    const { id } = req.params;
    const { cancha_id, usuario_id, fecha_reserva, hora_inicio, hora_fin } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .input('cancha_id', sql.Int, cancha_id)
            .input('usuario_id', sql.Int, usuario_id)
            .input('fecha_reserva', sql.Date, fecha_reserva)
            .input('hora_inicio', sql.Time, hora_inicio)
            .input('hora_fin', sql.Time, hora_fin)
            .query(`
                UPDATE Reservas
                SET cancha_id = @cancha_id, usuario_id = @usuario_id, fecha_reserva = @fecha_reserva,
                    hora_inicio = @hora_inicio, hora_fin = @hora_fin
                WHERE id = @id
            `);
        res.json({ message: 'Reserva actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar reserva
exports.deleteReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Reservas WHERE id = @id');
        res.json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar reserva:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
