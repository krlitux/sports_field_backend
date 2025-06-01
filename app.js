require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const usuarioRoutes = require('./routes/usuarioRoutes');
const canchaRoutes = require('./routes/canchaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const swaggerUi = require('swagger-ui-express');
const setupSwagger = require('./docs/swagger');

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/canchas', canchaRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger));

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
