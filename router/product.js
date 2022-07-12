const express = require("express");
const router = express.Router();
const { productImage } = require("../utils/multer");
const {
  allProducts,
  oneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product");

router.route("/").get(allProducts).post(productImage, createProduct);

router
  .route("/productId")
  .get(oneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
