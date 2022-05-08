const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// import routes
const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const reviewRoutes = require('./api/reviews');
const cartRoutes = require('./api/cart');

// Start mongoose connection
mongoose.connect(process.env.MONGO_CONNECTION, () =>
  console.log('Connected to MongoDB instance successfully!')
);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Use routers
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/reviews', reviewRoutes);
app.use('/cart', cartRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
