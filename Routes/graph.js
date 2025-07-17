const express = require('express');
const router = express.Router();
const City = require('../Modules/cities');
const dijkstra = require('../utils/dijkstra');
const path = require('path');
const fs = require('fs');



// Get full graphr
router.get('/graph', (req, res) => {
const filePath = path.join(__dirname, '..', 'utils', 'cities.json');


  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Failed to fetch graph data' });
    }

    try {
      const graph = JSON.parse(data);
      res.json(graph);
    } catch (parseErr) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Get shortest path using Dijkstra
router.get('/shortest-path', async(req, res) => {
    const { src, dest } = req.query;
    if (!src || !dest) {
        return res.status(400).json({ error: 'Please provide both src and dest in query' });
    }

    try {
        const cities = await City.find();
        const path = dijkstra(cities, src, dest);
        res.json({ path });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate shortest path' });
    }
});

module.exports = router;