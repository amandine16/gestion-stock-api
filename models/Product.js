const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  product_name: String,
  product_price: Number,
  product_brand: String,
  product_quantity: Number,
});

module.exports = Product;
