const express = require('express');
const CartItem = require('../models/cartItem');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

// get user cart
router.get('/', (req, res) => {
  if (req.query.user_id) {
    // Find all cart items that belong to the user
    CartItem.find({ user_id: req.query.user_id })
      .then((cartItems) => {
        res.status(200).json(cartItems);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json({ error: 'No user_id provided' });
  }
});

router.post('/', (req, res) => {
  const { user_id, product_id } = req.body;

  const newCartItem = new CartItem({
    user_id,
    product_id,
  });

  // add to mongo
  newCartItem
    .save()
    .then((cartItem) => {
      res.status(201).json(cartItem);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete given item from user's cart
router.delete('/', (req, res) => {
  // find and delete cartItem
  CartItem.findByIdAndDelete(req.query.item_id)
    .then((cartItem) => {
      res.status(200).json(cartItem);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/buy', async (req, res) => {
  const { user_id } = req.body;

  // Get all CartItems belonging to that user
  CartItem.find({ user_id })
    .then(async (cartItems) => {
      // add each cartItem to the user's purchased items
      cartItems.forEach(async (cartItem) => {
        console.log('Deleting: ', cartItem);
        await User.findOneAndUpdate(user_id, {
          $push: {
            purchases: {
              product_id: cartItem.product_id,
              purchase_date: new Date(),
            },
          },
        });
        // Delete cartItem
        cartItem.remove();
      });
    })
    .then(() => {
      res.status(200).json({ success: true });
    });
});

module.exports = router;
