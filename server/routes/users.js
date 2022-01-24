const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");

router.get("/checklogin", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
      failureFlash: "Invalid username or password.",
    },
    (err, user, info) => {
      if (user === false) {
        return res.status(200).json({ success: false });
      } else {
        delete user.hash;
        delete user.salt;
        return res.status(200).json({ success: true, user });
      }
    }
  )(req, res, next);
});

router.get("/logout", function (req, res, next) {
  console.log(req.user);
  console.log("Attempt Logout");
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
  });
});

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  console.log("Attempt Login");
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        console.log("return cookie");
        res.cookie("jwt", tokenObject.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Register a new user
router.post("/register", function (req, res, next) {
  const password = req.body.password;
  const username = req.body.username;

  const saltHash = utils.genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: username,
    hash: hash,
    salt: salt,
  });

  // Find if email has previously been used

  try {
    newUser.save().then((user) => {
      const tokenObject = utils.issueJWT(user);
      console.log("return cookie");
      res.cookie("jwt", tokenObject.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        user: user,
      });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = router;
