// src/config/database.js
const { Pool } = require('pg');

// En Vercel ya tienes las env vars definidas
// Si usas DATABASE_URL, agrega SSL.
// Si tu proveedor ya incluye ?sslmode=require en la URL, igual es seguro mantener ssl.
const isProd = process.env.NODE_ENV === 'production';

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }  // 👈 importante para cloud PG
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: isProd ? { rejectUnauthorized: false } : false
    });

pool.on('error', (err) => {
  console.error('PG Pool Error:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // opcional por si quieres acceder al pool directo
};
 
