const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Route to register a user
router.post('/register', (req, res) => {
  const { display_name, username, password } = req.body;

  // Password shall be stored as plain text because that is not a requirement for this project
  // Besides, I don't really feel like installing BCrypt for this project
  const newUser = new User({
    display_name,
    username,
    password,
  });

  newUser
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to bypass login if token exists
router.post('/prev-login', (req, res) => {
  const { user_id } = req.body;

  User.findOne({ user_id })
    // User found, returning user instance
    .then((user) => {
      res.status(200).json(user);
    })
    // User not found, returning error
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to log in user if they are not already logged in
router.post('/login', (req, res) => {
  // Find user with given username
  User.findOne({ username: req.body.username })
    .then((user) => {
      // Check if password is correct
      if (user.password !== req.body.password) {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        // Return user object
        res.status(200).json(user);
      }
    })
    // User not found, returning error
    .catch((err) => {
      res.status(401).json({ error: 'Invalid username' });
    });
});

// get specific user
router.get('/', (req, res) => {
  const { user_id } = req.query;
  User.findOne({ _id: user_id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
