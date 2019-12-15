const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvalidTokenSchema = new Schema(
  {},
  { collection: 'invalidToken' }
);

module.exports = mongoose.model('invalidToken', InvalidTokenSchema);