const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:user_id', (req, res) => {
  if (req.params.user_id) {
    User.findById(req.params.user_id).then((user) => {
      res.status(200).json(user.purchases);
    });
  }
});

module.exports = router;
