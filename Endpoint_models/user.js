var mongoose = require('mongoose');

var user = mongoose.Schema({
  email: { type: String, required: true, unique: true  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isValid: { type: Boolean, required: true },
  uniqueString: {type: String, required: true}
});
module.exports = mongoose.model('user', user);