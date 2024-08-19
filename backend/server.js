const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/service_finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

