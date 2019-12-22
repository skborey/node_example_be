const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantRelationSchema = new Schema(
  { // _id no need to assign, it could case the problem in operation
    restaurant_id: String,
    collection_id: String
  },
  {
    collection: 'restaurant_relation'
  }
);

module.exports = mongoose.model('RestaurantRelation', RestaurantRelationSchema);