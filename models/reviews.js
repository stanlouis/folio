const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    review_post: {
      type: String,
      default: 'n/a'
    },
    overall_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    content_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    design_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    responsiveness_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    _portfolio_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
