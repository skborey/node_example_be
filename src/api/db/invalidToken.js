const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvalidTokenSchema = new Schema(
  {
    token: String
  },
  { collection: 'invalidToken' }
);

module.exports = mongoose.model('invalidToken', InvalidTokenSchema);