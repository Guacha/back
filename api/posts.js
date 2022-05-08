const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');

const router = express.Router();

// get specific post
router.get('/', (req, res) => {
  if (req.query.post_id) {
    Post.findById(req.query.post_id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    Post.find({
      purchased: false,
    })
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

// create post
router.post('/', (req, res) => {
  const { owner_id, img_url, display_name, price } = req.body;

  const newPost = new Post({
    display_name,
    img_url,
    price,
    owner_id,
    created_date: new Date(),
  });

  // add to mongo
  newPost
    .save()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get recent posts
router.get('/recent', (req, res) => {
  Post.find({
    purchased: false,
  })
    .sort({ created_date: -1 })
    .limit(10)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
