const mongoose = require("mongoose");
require("dotenv").config();

// const url = "mongodb://localhost/ScofidDb";
const url = process.env.ATLAS;

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose;
