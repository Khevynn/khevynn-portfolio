const { Op } = require("sequelize");
const ProjectModel = require("../models/project.model");

const ProjectRepository = {
  /** All projects, ordered for display */
  async findAll() {
    return await ProjectModel.findAll({
      order: [
        ["display_order", "ASC"],
        ["id", "ASC"],
      ],
    });
  },

  /** Only published projects (for public API) */
  async findPublished() {
    return await ProjectModel.findAll({
      where: { is_published: 1 },
      order: [
        ["display_order", "ASC"],
        ["id", "ASC"],
      ],
    });
  },

  /** Featured + published projects for homepage */
  async findFeatured() {
    return await ProjectModel.findAll({
      where: { is_featured: 1, is_published: 1 },
      order: [
        ["display_order", "ASC"],
        ["id", "ASC"],
      ],
    });
  },

  async findById(id) {
    return await ProjectModel.findByPk(id);
  },

  /** Find by slug for public detail page */
  async findBySlug(slug) {
    return await ProjectModel.findOne({
      where: { slug, is_published: 1 },
    });
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

  /** Toggle isFeatured flag */
  async toggleFeatured(id) {
    const project = await ProjectModel.findByPk(id);
    if (!project) return null;
    return await project.update({ isFeatured: project.isFeatured ? 0 : 1 });
  },

  /** Toggle isPublished flag */
  async togglePublished(id) {
    const project = await ProjectModel.findByPk(id);
    if (!project) return null;
    return await project.update({ isPublished: project.isPublished ? 0 : 1 });
  },

  /**
   * Bulk update display_order.
   * @param {Array<{id: number, order: number}>} orderedList
   */
  async reorder(orderedList) {
    const updates = orderedList.map(({ id, order }) =>
      ProjectModel.update({ display_order: order }, { where: { id } })
    );
    return await Promise.all(updates);
  },
};

module.exports = ProjectRepository;
