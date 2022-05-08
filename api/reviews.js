const express = require('express');

// require review model
const Review = require('../models/review');

const router = express.Router();

router.post('/', (req, res) => {
  const { description, product_id, rating, user_id } = req.body;

  const newReview = new Review({
    description,
    product_id,
    rating,
    user_id,
    created_date: new Date(),
  });

  // add to mongo
  newReview
    .save()
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get reviews
router.get('/', (req, res) => {
  if (req.query.id) {
    Review.find({
      product_id: req.query.id,
    })
      .then((reviews) => {
        res.status(200).json(reviews);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    Review.find()
      .then((reviews) => {
        res.status(200).json(reviews);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

module.exports = router;
