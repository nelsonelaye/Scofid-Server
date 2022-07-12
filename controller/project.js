const projectModel = require("../model/project");
const cloudinary = require("../utils/cloudinary");

const allProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();

    res.status(200).json({
      status: "Success",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const oneProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);

    res.status(200).json({
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title } = req.body;
    const project = await projectModel.findById(req.params.projectId);

    if (project) {
      await cloudinary.uploader.destroy(project.imageId);
      const result = await cloudinary.uploader.upload(req.file.path);

      const newProject = await projectModel.findByIdAndUpdate(
        req.params.projectId,
        {
          title,
          image: result.secure_url,
          imageId: result.public_id,
        },
        { new: true }
      );

      res.status(200).json({
        data: newProject,
      });
    } else {
      res.status(404).json({
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (project) {
      await cloudinary.uploader.destroy(project.imageId);

      await projectModel.findByIdAndDelete(req.params.projectId);

      res.status(204).json({
        message: "Project Deleted",
      });
    } else {
      res.status(404).json({
        message: "Project not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const project = await projectModel.create({
      title,
      image: result.secure_url,
      imageId: result.public_id,
    });

    res.status(201).json({
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  allProjects,
  oneProject,
  createProject,
  deleteProject,
  updateProject,
};
