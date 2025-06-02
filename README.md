# 🏟️ Sports Fields Backend - MVP

Este proyecto es el backend de una plataforma de reservas de canchas deportivas. Permite a jugadores registrarse, buscar canchas y hacer reservas, mientras que los proveedores pueden gestionar sus propias canchas y visualizar las reservas realizadas.


## 🧰 Tecnologías

- Node.js + Express
- Sequelize ORM
- MS SQL Server
- JWT (Autenticación)
- Swagger UI (Documentación)
- bcrypt (hash de contraseñas)
- dotenv (variables de entorno)


## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/krlitux/sports_field_backend.git
cd sports_field_backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo .env con el siguiente contenido:
```
PORT=3000
DB_USER=tu_usuario_sql
DB_PASSWORD=tu_clave
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=nombre_base
JWT_SECRET=tu_secreto
```


## 🚀 Iniciar servidor

```bash
node ./app.js
```
Servidor en: http://localhost:3000

Documentación Swagger: http://localhost:3000/api-docs


## 🔐 Autenticación

La autenticación se realiza vía JWT. Los tokens se deben enviar en el header:

```makefile
Authorization: Bearer <token>
```


## 🧾 Endpoints principales

**Usuarios**

POST /api/usuarios/register – Registrar jugador

POST /api/usuarios/login – Login jugador

GET /api/usuarios/me – Ver perfil

**Proveedores**

POST /api/proveedores/register – Registrar proveedor

POST /api/proveedores/login – Login proveedor

GET /api/proveedores/me – Ver perfil

**Canchas** (solo proveedor autenticado)

POST /api/canchas – Crear cancha

GET /api/canchas – Ver canchas del proveedor

DELETE /api/canchas/:id – Eliminar cancha

**Reservas**

POST /api/reservas – Crear reserva (jugador)

GET /api/reservas/mis-reservas – Ver mis reservas (jugador)

GET /api/reservas/proveedor – Ver reservas de mis canchas (proveedor)


## 📚 Documentación interactiva
Accedé a toda la documentación de la API en Swagger:

🔗 http://localhost:3000/api-docs

📌 Estado actual
✅ MVP Backend funcional
⏳ Pendientes para versión 1.0:

Edición de canchas

Cancelación de reservas

Validación de disponibilidad

Mejoras de seguridad y validación