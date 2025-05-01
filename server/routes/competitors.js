const express = require('express');
const router = express.Router();

router.get('/competitors', (req, res) => {
    const competitor = req.query.competitor || '';
    const filteredData = global.competitorsData.filter(item => 
        item.competitor.toLowerCase().includes(competitor.toLowerCase())
    );
    res.json(filteredData);
});

module.exports = router;