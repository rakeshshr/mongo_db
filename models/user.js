// test.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  author: String,	
  text: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;