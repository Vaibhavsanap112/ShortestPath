const express = require('express');
const router = express.Router();
const City = require('../Models/City');
const dijkstra = require('../utils/dijkstra');

// Get full graph
router.get('/graph', async(req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch graph data' });
    }
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