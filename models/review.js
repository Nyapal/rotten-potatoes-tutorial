const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

module.exports = Review
