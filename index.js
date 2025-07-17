const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const graphRoutes = require('./Routes/graph');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use('/api', graphRoutes);

mongoose.connect('mongodb://localhost:27017/graphdb')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.listen(3000, () => console.log('Server on http://localhost:3000'));