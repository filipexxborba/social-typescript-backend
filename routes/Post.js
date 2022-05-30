const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../models/Post");

// Get all post routes
router.get("/", (_, res) => {
  Post.find({}, (error, posts) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(posts);
  });
});

// Create a new post
router.post("/create", (req, res) => {
  const { author_name, author_id, content } = req.body;
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    author_name: author_name,
    author_id: author_id,
    date_created: new Date(),
    content: content,
    likes: 0,
  });

  post
    .save()
    .then((post) => res.status(200).send(post))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
