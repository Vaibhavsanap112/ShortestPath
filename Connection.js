const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  connections: [
    {
      destination: String,
      weight: Number
    }
  ]
});

module.exports = mongoose.model('City', citySchema);
