const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    image: {
      type: String,
    },
    imageId: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productModel);
