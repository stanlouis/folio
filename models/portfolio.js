const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    review: {
      type: String,
      default: 'n/a'
    },
    imgUrl: {
      type: String,
      default: 'n/a'
    },
    overall_rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5
    },
    content_rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5
    },
    design_rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5
    },
    responsiveness_rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5
    },
    ownerId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { Portfolio };
