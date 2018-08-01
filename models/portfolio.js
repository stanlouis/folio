const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const portfolioSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true,
      unique: { index: { unique: true } }
    },
    imgUrl: {
      type: String,
      default: 'n/a'
    },
    ownerId: {
      type: String,
      required: true
    },
    // for filtering Portfolio for reviewed or not
    reviewed: {
      type: Boolean,
      default: false
    },
    // `note` is an object that stores a Review id
    // The ref property links the ObjectId to the Review model
    // This allows us to populate the Portfolio with an associated Review
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { Portfolio };
