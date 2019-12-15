const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    _id: String,
    title: String,
    restaurant: Array,
    collaboration: Array
  },
  {
    collection: 'collection'
  }
);

module.exports = mongoose.model('Colection', CollectionSchema);