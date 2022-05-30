const express = require("express");
const mongoose = require("mongoose");
const { createIndexes } = require("../models/Post");
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

// Delete a post
router.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, post) => {
    if (error) res.status(404).send(error);
    else res.status(200).send(post);
  });
});

// Edit a post
router.patch("/:id", (req, res) => {
  const { content } = req.body;
  Post.findByIdAndUpdate(req.params.id, { content: content }, (error, post) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(post);
  });
});

// Like a post
router.patch("/like/:id", (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    if (error) res.status(404).send(error);
    else {
      post.likes = post.likes + 1;
      post
        .save()
        .then((post) => res.status(200).send(post))
        .catch((error) => res.status(404).send(error));
    }
  });
});

module.exports = router;
