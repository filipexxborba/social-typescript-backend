const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  profile_pic: String,
  last_login: Date,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
