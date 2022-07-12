const express = require("express");
const router = express.Router();

const {
  allUsers,
  oneUser,
  deleteUser,
  updateUser,
  createUser,
  signIn,
} = require("../controller/user");

router.route("/").get(allUsers).post(createUser);

router.route("/:userId").get(oneUser).patch(updateUser).delete(deleteUser);

router.post("/login", signIn);

module.exports = router;
