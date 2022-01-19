const mongoose = require("mongoose")

const ShopSchema = new mongoose.Schema({
  userid: String,
  url: String,
  title: String,
  image: String,
  price: String,
})


mongoose.model('Shop', ShopSchema);