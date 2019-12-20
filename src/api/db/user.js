const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  { // _id no need to assign, it could case the problem in operation
    email: String,
    password: String
  },
  {
    collection: 'user'
  }
);

module.exports = mongoose.model('User', UserSchema);