const express = require("express");
const router = express.Router();
const { projectImage } = require("../utils/multer");
const {
  allProjects,
  oneProject,
  createProject,
  deleteProject,
  updateProject,
} = require("../controller/project");

router.route("/").get(allProjects).post(projectImage, createProject);
router
  .route("/:projectId")
  .get(oneProject)
  .patch(projectImage, updateProject)
  .delete(deleteProject);

module.exports = router;
