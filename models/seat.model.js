const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  day: { type: String, required: true },
  seat: { type: String, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Seat', seatsSchema);
