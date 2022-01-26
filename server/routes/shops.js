const mongoose = require("mongoose");
const router = require("express").Router();
const Shop = mongoose.model("Shop");
const passport = require("passport");

router.get("/name/:shopname", function (req, res, next) {
  const shopname = req.params.shopname;
  Shop.findOne({ url: shopname })
    .then((shop) => {
      if (shop == null) {
        res.json({ success: false, msg: `Could not find shop ${shopname}` });
      } else {
        res.json({ success: true, shop });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

router.get(
  "/myshop",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    Shop.findOne({ userid: req.user._id })
      .then((shop) => {
        res.json({ success: true, shop });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  }
);

const restrictedUrls = new Set(["www"]);

router.post(
  "/myshop",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body.url);
    req.body.url = req.body.url.toLowerCase();
    if (restrictedUrls.has(req.body.url)) {
      res.json({
        success: false,
        msg: "Cannot use this url",
      });
    }

    const filter = { userid: req.user._id };
    const update = {
      ...req.body,
    };

    Shop.findOneAndUpdate(filter, update, { upsert: true, new: true })
      .then((shop) => {
        res.json({ success: true });
      })
      .catch((err) => {
        if (err.keyValue && err.keyValue.url) {
          res.json({
            success: false,
            msg: "Url already in use",
          });
        } else {
          console.log(err);
          res.json({ success: false });
        }
      });
  }
);

module.exports = router;
