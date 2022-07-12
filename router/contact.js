const express = require("express");
const router = express.Router();
const {
  contactAdmin,
  viewContacts,
  viewOneContact,
  updateContact,
  deleteContact,
} = require("../controller/contact");

router.route("/").get(viewContacts).post(contactAdmin);

router

  .route("/:contactId")
  .get(viewOneContact)
  .patch(updateContact)
  .delete(deleteContact);

module.exports = router;
