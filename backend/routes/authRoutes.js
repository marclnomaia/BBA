const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role, location } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword, role, location });
  await user.save();

  const token = jwt.sign({ userId: user._id }, 'secret');
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, 'secret');
  res.json({ token });
});

module.exports = router;
