const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author_name: String,
  author_id: mongoose.Schema.Types.ObjectId,
  date_created: Date,
  content: String,
  likes: Number,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
