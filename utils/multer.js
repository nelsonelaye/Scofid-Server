const multer = require("multer");
const path = require("path");

const projectStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "projects");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const projectImage = multer({ storage: projectStorage }).single("image");
const productImage = multer({ storage: productStorage }).single("image");

module.exports = { projectImage, productImage };
