const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['client', 'provider'], default: 'client' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});

UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);
