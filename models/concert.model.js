const mongoose = require('mongoose');

const concertsSchema = new mongoose.Schema({
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: String, required: true },
  day: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concert', concertsSchema);
