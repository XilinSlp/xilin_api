// src/config/database.js
const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'production';

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
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
  pool,
};
