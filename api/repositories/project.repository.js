const ProjectModel = require("../models/project.model");

const ProjectRepository = {
  async findAll() {
    return await ProjectModel.findAll();
  },

  async findById(id) {
    return await ProjectModel.findByPk(id);
  },

  async create(data) {
    return await ProjectModel.create(data);
  },

  async update(id, data) {
    const project = await ProjectModel.findByPk(id);
    if (!project) return null;
    return await project.update(data);
  },

  async delete(id) {
    const project = await ProjectModel.findByPk(id);
    if (!project) return null;
    await project.destroy();
    return true;
  },
};

module.exports = ProjectRepository;
