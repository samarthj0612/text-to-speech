var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tts");
var plm = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
