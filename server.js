// server.js
// Carga .env solo en local (en Vercel usas Env Vars del panel)
if (process.env.NODE_ENV !== 'production') {
  try { require('dotenv').config(); } catch (_) {}
}

const express = require('express');
const cors = require('cors');

const productoRoutes  = require('./src/routes/producto.routes.js');
const categoriaRoutes = require('./src/routes/categoria.routes.js');
const solicitudRoutes = require('./src/routes/solicitud.routes.js');
const blogRoutes      = require('./src/routes/blog.routes.js');

const app = express();

// CORS (ajusta origins si necesitas restringir)
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', productoRoutes);
app.use('/api', solicitudRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', blogRoutes);

// Raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ ok: true, name: 'xilin-api', env: process.env.NODE_ENV || 'dev' });
});

// 🔴 Importante: NO usar app.listen en Vercel
// Exporta la app (CommonJS)
module.exports = app;
