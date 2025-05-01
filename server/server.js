const express = require('express');
const path = require('path');
const fs = require('fs');
const competitorsRouter = require('./routes/competitors');

const app = express();
const port = process.env.PORT || 3000;

// Load competitors data on startup
let competitorsData;
try {
    competitorsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'competitors.json'), 'utf8'));
    console.log('Competitors data loaded:', competitorsData.length, 'entries');
} catch (error) {
    console.error('Error loading competitors.json:', error.message);
    competitorsData = [];
}

// Pass competitorsData to competitorsRouter
require('./routes/competitors').setCompetitors(competitorsData);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', competitorsRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;