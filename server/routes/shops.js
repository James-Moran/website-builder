const mongoose = require('mongoose');
const router = require('express').Router();
const Shop = mongoose.model('Shop');
const passport = require('passport');

router.get('/:shopname', function (req, res, next) {
  const shopname = req.params.shopname;
  console.log(req.params);
  Shop.findOne({ url: shopname })
    .then((shop) => {
      if (shop == null) {
        res.json({ err: `Could not find shop ${shopname}` })
      } else {
        res.json(shop);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/shop', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const filter = {userid: req.user._id}

  const update = {
    url: req.body.url,
    title: req.body.title,
    price: req.body.price
  };

  try {
    Shop.findOneAndUpdate(filter, update, {upsert: true, new: true})
      .then((shop) => {
        res.json({ success: true, shop });
      });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = router;
