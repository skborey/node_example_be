const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollaborationSchema = new Schema(
  { // _id no need to assign, it could case the problem in operation
    name: String,
    email: String,
    collection_id: String,
  },
  {
    collection: 'collaboration'
  }
);

module.exports = mongoose.model('Collaboration', CollaborationSchema);