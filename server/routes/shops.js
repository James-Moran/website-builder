const mongoose = require("mongoose");
const router = require("express").Router();
const Shop = mongoose.model("Shop");
const passport = require("passport");

router.get("/name/:shopname", function (req, res, next) {
  const shopname = req.params.shopname;
  Shop.findOne({ url: shopname })
    .then((shop) => {
      if (shop == null) {
        res.json({ success: false, err: `Could not find shop ${shopname}` });
      } else {
        res.json({ success: true, shop });
      }
    })
    .catch((err) => {
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
        next(err);
      });
  }
);

router.post(
  "/myshop",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const filter = { userid: req.user._id };

    const update = {
      ...req.body,
    };

    try {
      Shop.findOneAndUpdate(filter, update, { upsert: true, new: true }).then(
        (shop) => {
          res.json({ success: true, shop });
        }
      );
    } catch (err) {
      res.json({ success: false, msg: err });
    }
  }
);

module.exports = router;
