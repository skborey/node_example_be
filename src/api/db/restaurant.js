const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: String,
    open: String
  },
  {
    collection: 'restaurant'
  }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);