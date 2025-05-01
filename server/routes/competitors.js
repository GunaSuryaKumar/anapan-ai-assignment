const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db from db.js

router.get('/competitors', (req, res) => {
    const competitor = req.query.competitor || ''; // Search by competitor, default to empty string
    const query = `
        SELECT competitor, description, source
        FROM competitors
        WHERE competitor LIKE ?
    `;
    db.all(query, [`%${competitor}%`], (err, rows) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;