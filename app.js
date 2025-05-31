const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const sql = require('mssql');

// Cargar variables de entorno
dotenv.config();

// Configuración base de datos
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: (process.env.DB_ENCRYPT === 'true'),
        trustServerCertificate: true
    }
};

// Crear app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Documentación Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas API
const userRoutes = require('./routes/users');
const canchaRoutes = require('./routes/canchas');
const reservaRoutes = require('./routes/reservas');

app.use('/api/usuarios', userRoutes);
app.use('/api/canchas', canchaRoutes);
app.use('/api/reservas', reservaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Backend del MVP funcionando');
});

// Conexión a la BD y levantar servidor
sql.connect(config)
    .then(() => {
        console.log('📦 Conectado a la base de datos');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error conectando a la BD:', err);
    });
