const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  displaySize: {
    type: String,
    required: true
  },
  displayResolution: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: true
  },
  memory: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  camera: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: { type: mongoose.Schema.ObjectId, ref: "Shop" }
});

module.exports = mongoose.model("Product", productSchema);
