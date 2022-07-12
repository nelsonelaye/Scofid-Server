require("./utils/db");
const express = require("express");
const cors = require("cors");
const projectRoutes = require("./router/project");
const productRoutes = require("./router/product");
const contactRoutes = require("./router/contact");
const userRoutes = require("./router/user");
const port = 1371;

const app = express();

app.use(cors);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Scofid 1st Avenue");
});

app.use("/api/project", projectRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("Server running on port - ", port);
});

module.exports = app;
