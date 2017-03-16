// Load mongoose package
var mongoose = require('mongoose');
// Create a schema
var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  active: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema
var User = mongoose.model('User', UserSchema);
module.exports = User;