const mongoose = require('mongoose');

const User = new mongoose.Schema({
  display_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchases: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model('User', User);
