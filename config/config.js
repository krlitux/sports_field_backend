require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  },
};
