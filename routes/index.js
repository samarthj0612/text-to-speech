var express = require("express");
const passport = require("passport");
var router = express.Router();
var say = require("say");
var userModel = require("../models/users");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/speak/:text", function (req, res) {
  var text = req.params.text;

  say.export(text, "Cellos", 1, "sj.wav", (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Text has been saved to hal.wav.");
  });

  say.speak(text, null, 1, function (err) {
    if (err) throw err;
    console.log("Complete");
    res.json({ status: "done" });
  });
});

router.get("/stop", function (req, res) {
  say.stop();
  res.json({ status: "done" });
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  var userData = new userModel({
    username: req.body.username,
    email: req.body.email,
  });

  userModel
    .register(userData, req.body.password)
    .then(function (user) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.get("/home", isLoggedIn, function (req, res) {
  userModel
    .findOne({ username: req.session.passport.user })
    .then(function (user) {
      res.render("home", { user });
    });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/register",
  }),
  function (req, res, next) {}
);

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logOut(function (err) {
    if (err) throw err;
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
