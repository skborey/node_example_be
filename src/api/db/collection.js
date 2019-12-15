const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    _id: String,
    name: String,
    owner_email: String,
    restaurants: Array,
    collaborations: Array
  },
  {
    collection: 'collection'
  }
);

module.exports = mongoose.model('Collection', CollectionSchema);