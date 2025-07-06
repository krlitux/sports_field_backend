# 🏟️ Sports Fields Backend - MVP

Este proyecto es el backend de una plataforma de reservas de canchas deportivas. Permite a jugadores registrarse, buscar canchas y hacer reservas, mientras que los proveedores pueden gestionar sus propias canchas y visualizar las reservas realizadas.


## 🧰 Tecnologías utilizadas

- Node.js + Express
- Sequelize ORM
- MS SQL Server
- JWT para autenticación
- Swagger (autogen) para documentación
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
DB_USER=tu_usuario
DB_PASSWORD=tu_clave
DB_SERVER=localhost
DB_DATABASE=nombre_bd
DB_PORT=1433
DB_ENCRYPT=false
JWT_SECRET=clave_secreta
```


4. Iniciar servidor

```bash
node ./app.js
```
Servidor en: http://localhost:3000


## 📁 Estructura del proyecto

```bash
/config          → Configuración de DB y JWT
/controllers     → Lógica de negocio por entidad
/models          → Definición de entidades Sequelize
/routes          → Endpoints por entidad
/middlewares     → Autenticación y control de acceso
/docs            → Swagger autogen config
```


## 🔐 Autenticación y roles

- Usuarios (/api/usuarios) y Proveedores (/api/proveedores) usan login separado.
- Cada JWT contiene el tipo de usuario (jugador, proveedor, admin)
- Acceso restringido mediante middleware authMiddleware + roleMiddleware


## 🧾 Endpoints principales

**Usuarios (Jugadores)**

- POST /api/usuarios/register → Registro
- POST /api/usuarios/login → Login
- GET /api/usuarios/me → Perfil
- GET /api/reservas/mis-reservas → Historial de reservas
- POST /api/reservas → Crear reserva

**Proveedores**

- POST /api/proveedores/register → Registro
- POST /api/proveedores/login → Login
- GET /api/proveedores/me → Perfil
- POST /api/canchas → Crear cancha
- GET /api/canchas/mis-canchas → Ver canchas propias

**Canchas** (público autenticado)
- GET /api/canchas/disponibles → Ver canchas para reservar


## 📚 Documentación Swagger
Una vez iniciado el servidor, acceda a:

```bash
http://localhost:3000/api-docs
```
Para regenerar la documentación automáticamente:

```bash
node docs/swagger.js
```
Esto actualiza el archivo swagger-output.json con los endpoints actuales.

## 🗺️ Roadmap (resumen)
✅ Versión 1.0 (MVP actual)

- Registro/login jugadores y proveedores
- Reservar cancha
- Ver historial de reservas
- Gestión de canchas por proveedor

🔜 Versión 1.1+

- Suspensión de disponibilidad
- Favoritos y valoraciones
- Vista semanal de horarios
- Dashboard y reportes para proveedores

## ✨ Contribuciones
Pull requests, reportes de bugs o mejoras son bienvenidos. ¡Sumate al proyecto!

## 🧠 Autor
Desarrollado por krlitux – Proyecto académico con visión de producto real.
