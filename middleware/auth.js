const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const token = bearerHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Aquí se guarda el usuario y su rol
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = { verifyToken };
