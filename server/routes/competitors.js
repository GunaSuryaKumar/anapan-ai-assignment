const express = require('express');
const router = express.Router();

let competitorsData = [];

function setCompetitors(data) {
    competitorsData = data;
}

router.get('/competitors', (req, res) => {
    const competitor = req.query.competitor || '';
    const filteredData = competitorsData.filter(item => 
        item.competitor.toLowerCase().includes(competitor.toLowerCase())
    );
    res.json(filteredData);
});

module.exports = router;
module.exports.setCompetitors = setCompetitors;