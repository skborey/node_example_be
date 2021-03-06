const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    name: String,
    owner_email: String,
  },
  {
    collection: 'collection'
  }
);

module.exports = mongoose.model('Collection', CollectionSchema);