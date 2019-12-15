const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: String,
    hours: String
  },
  {
    collection: 'restaurant'
  }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);