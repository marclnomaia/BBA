const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  price: Number,
});

module.exports = mongoose.model('Service', ServiceSchema);
