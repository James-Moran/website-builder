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
    },
    (err, user, info) => {
      if (user === false) {
        return res.status(200).json({ success: false });
      } else {
        return res.status(200).json({ success: true, user: getUserData(user) });
      }
    }
  )(req, res, next);
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
  });
});

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  console.log("Attempt Login");
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, msg: "Email not registered" });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.cookie("jwt", tokenObject.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          user: getUserData(user),
        });
      } else {
        res.json({ success: false, msg: "Wrong Password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

// Register a new user
router.post("/register", function (req, res, next) {
  const password = req.body.password;
  const email = req.body.email;

  const saltHash = utils.genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: email,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      const tokenObject = utils.issueJWT(user);
      console.log("return cookie");
      res.cookie("jwt", tokenObject.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    })
    .catch((err) => {
      if (err.keyValue && err.keyValue.url) {
        res.json({
          success: false,
          msg: "Url already in use",
          keyValue: err.keyValue,
        });
      } else {
        console.log(err);
        res.json({ success: false });
      }
    });
});

function getUserData(user) {
  return { email: user.email };
}

module.exports = router;
