const mongoose = require("mongoose");

const projectModel = mongoose.Schema(
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

module.exports = mongoose.model("projects", projectModel);
