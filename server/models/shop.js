const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  userid: String,
  url: String,
  title: String,
  description: String,
  items: Array,
  color: String,
});

mongoose.model("Shop", ShopSchema);
