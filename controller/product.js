const productModel = require("../model/product");
const cloudinary = require("../utils/cloudinary");

const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const oneProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);

    res.status(200).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title } = req.body;
    const product = await productModel.findById(req.params.productId);

    if (product) {
      await cloudinary.uploader.destroy(product.imageId);
      const result = await cloudinary.uploader.upload(req.file.path);

      const newproduct = await productModel.findByIdAndUpdate(
        req.params.productId,
        {
          title,
          image: result.secure_url,
          imageId: result.public_id,
        },
        { new: true }
      );

      res.status(200).json({
        data: newproduct,
      });
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);

    if (product) {
      await cloudinary.uploader.destroy(product.imageId);

      await productModel.findByIdAndDelete(req.params.productId);

      res.status(204).json({
        message: "product Deleted",
      });
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = await productModel.create({
      title,
      image: result.secure_url,
      imageId: result.public_id,
    });

    res.status(201).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  allProducts,
  oneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
