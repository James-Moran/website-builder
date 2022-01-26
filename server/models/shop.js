const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  url: { type: String, unique: true },
  title: String,
  description: String,
  items: Array,
  color: String,
});

mongoose.model("Shop", ShopSchema);
