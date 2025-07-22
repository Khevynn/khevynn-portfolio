const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const Project = require("../models/project.model");
const ProjectRepository = require("../repositories/project.repository");

module.exports = {
  async getAllProjects() {
    try {
      const projects = await ProjectRepository.findAll();
      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error retrieving projects:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async createProject(data, file) {
    try {
      if (!file) return res.status(400).json({ error: "Image is required" });

      const response = await uploadImage(file);

      const imageUrl = response.data.data.url;

      // Clean up temp file
      fs.unlink(file.path, () => {});

      const projectToAdd = Project.build({
        name: data.name,
        description: data.description,
        status: data.status || "In Progress",
        usedTechnologies: data.usedTechnologies,
        githubUrl: data.githubUrl,
        downloadUrl: data.downloadUrl,
        imageUrl: imageUrl,
      });
      const newProject = await ProjectRepository.create(projectToAdd.get());
      return { status: 201, data: newProject };
    } catch (error) {
      console.error("Error creating project:", error);

      // Check if it's a Sequelize validation error
      if (error.name === "SequelizeValidationError") {
        return {
          status: 400,
          data: {
            message: "Validation Error",
            errors: error.errors.map((e) => e.message),
          },
        };
      }

      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async updateProject(id, data, file) {
    try {
      const project = await ProjectRepository.findById(id);
      if (!project) {
        return { status: 404, data: { message: "Project not found" } };
      }
      let imgUrl;
      if (file) {
        const response = await uploadImage(file);
        imgUrl = response.data.data.url;

        // Clean up temp file
        fs.unlink(file.path, () => {});
      }

      project.set({
        name: data.name,
        description: data.description,
        status: data.status || "In Progress",
        usedTechnologies: data.usedTechnologies,
        githubUrl: data.githubUrl,
        downloadUrl: data.downloadUrl,
        imageUrl: imgUrl || project.imageUrl,
      });

      const updatedProject = await ProjectRepository.update(id, project.get());
      return { status: 200, data: updatedProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async deleteProject(id) {
    try {
      let result = await ProjectRepository.delete(id);
      if (!result) {
        return { status: 404, data: { message: "Project not found" } };
      }
      return { status: 204, data: "Deleted" };
    } catch (error) {
      console.error("Error deleting project:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },
};

async function uploadImage(file) {
  const apiKey = process.env.IMGBB_API_KEY;
  const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const formData = new FormData();
  formData.append("image", fs.createReadStream(file.path));

  return await axios.post(uploadUrl, formData, {
    headers: formData.getHeaders(),
  });
}
