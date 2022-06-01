const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User");

// Login route
router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (error, user) => {
    if (error) res.status(404).send(error);
    if (!user)
      res
        .status(200)
        .send(
          JSON.stringify({ status: false, message: "E-mail não cadastrado" })
        );
    if (user && user.password !== password)
      res.status(200).send(
        JSON.stringify({
          status: false,
          message: "Senha incorreta, tente novamente",
        })
      );
    if (user && user.password === password) {
      user.last_login = new Date();
      user
        .save()
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(500).send(error));
    }
  });
});

router.post("/create", (req, res) => {
  const { name, email, password, profile_pic } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: password,
    profile_pic:
      profile_pic ||
      "https://webriti.com/wp-content/themes/themeshop/images/testimonial/no-image.png",
  });
  user
    .save()
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
});

router.post("/edit/:id", (req, res) => {
  const { name, profile_pic } = req.body;
  User.findById(req.params.id, (error, user) => {
    if (error) res.status(500).send(error);
    else {
      user.name = name;
      user.profile_pic = profile_pic;
      user
        .save()
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(500).send(error));
    }
  });
});

module.exports = router;
