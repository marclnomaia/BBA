const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { lat, lng, category } = req.query;

  const providers = await User.find({
    role: 'provider',
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: 20000, // 20 km radius
      },
    },
    'services.category': category,
  }).populate('services');

  res.json(providers);
});

module.exports = router;
