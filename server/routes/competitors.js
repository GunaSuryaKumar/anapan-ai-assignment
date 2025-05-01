const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let competitorsData;
try {
    competitorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/competitors.json'), 'utf8'));
    console.log('Competitors data loaded:', competitorsData.length, 'entries');
} catch (error) {
    console.error('Error loading competitors.json:', error.message);
    competitorsData = [];
}

router.get('/competitors', (req, res) => {
    const competitor = req.query.competitor || '';
    const filteredData = competitorsData.filter(item => 
        item.competitor.toLowerCase().includes(competitor.toLowerCase())
    );
    res.json(filteredData);
});

module.exports = router;