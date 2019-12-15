const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollaborationSchema = new Schema(
  {
    name: String,
    email: String
  },
  {
    collection: 'collaboration'
  }
);

module.exports = mongoose.model('Collaboration', CollaborationSchema);