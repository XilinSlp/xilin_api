const { Router } = require('express');
const { query } = require('../config/database');
const r = Router();

r.get('/_db', async (_req, res) => {
  try {
    const { rows } = await query('SELECT 1 AS ok');
    res.json({ ok: true, db: rows[0] });
  } catch (e) {
    console.error('DB health error:', {
      message: e.message, code: e.code, detail: e.detail, hint: e.hint
    });
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = r;
