const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const Project = require("../models/project.model");
const ProjectRepository = require("../repositories/project.repository");

/** Generate a URL-safe slug from a project name */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Make a slug unique by appending a timestamp if needed */
async function uniqueSlug(name) {
  const base = generateSlug(name);
  const all = await ProjectRepository.findAll();
  const existing = all.map((p) => p.slug);
  if (!existing.includes(base)) return base;
  return `${base}-${Date.now()}`;
}

/** Parse a JSON string or return an array as-is */
function parseJsonField(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    // If it's a comma-separated string, convert it
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
}

/** Upload a single file to ImgBB and return the URL */
async function uploadImage(file) {
  const apiKey = process.env.IMGBB_API_KEY;
  const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
  const formData = new FormData();
  formData.append("image", fs.createReadStream(file.path));
  return await axios.post(uploadUrl, formData, {
    headers: formData.getHeaders(),
  });
}

/** Upload multiple files to ImgBB, return array of URLs */
async function uploadImages(files) {
  const urls = [];
  for (const file of files) {
    try {
      const response = await uploadImage(file);
      const url = response.data?.data?.url;
      if (url) urls.push(url);
    } catch (err) {
      console.error("Failed to upload image:", file.originalname, err.message);
    } finally {
      fs.unlink(file.path, () => {});
    }
  }
  return urls;
}

module.exports = {
  async getAllProjects() {
    try {
      const projects = await ProjectRepository.findPublished();
      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error retrieving projects:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async getAllProjectsAdmin() {
    try {
      const projects = await ProjectRepository.findAll();
      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error retrieving projects:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async getFeaturedProjects() {
    try {
      const projects = await ProjectRepository.findFeatured();
      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error retrieving featured projects:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async getProjectById(id) {
    try {
      const project = await ProjectRepository.findById(id);
      if (!project) return { status: 404, data: { message: "Project not found" } };
      return { status: 200, data: project };
    } catch (error) {
      console.error("Error retrieving project:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async getProjectBySlug(slug) {
    try {
      const project = await ProjectRepository.findBySlug(slug);
      if (!project) return { status: 404, data: { message: "Project not found" } };
      return { status: 200, data: project };
    } catch (error) {
      console.error("Error retrieving project by slug:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async createProject(data, files) {
    try {
      // files is either an array (multi) or a single file object
      const fileArray = Array.isArray(files) ? files : files ? [files] : [];

      const imageUrls = fileArray.length > 0 ? await uploadImages(fileArray) : [];
      const coverImage = imageUrls[0] || null;
      const galleryImages = imageUrls.slice(1);

      const slug = await uniqueSlug(data.name);

      const techTags = parseJsonField(data.techTags);
      const impactMetrics = parseJsonField(data.impactMetrics);

      const projectToAdd = {
        name: data.name,
        slug,
        description: data.description,
        shortDescription: data.shortDescription || null,
        detailedDescription: data.detailedDescription || null,
        category: data.category || "Other",
        techTags: techTags || [],
        impactMetrics: impactMetrics || [],
        status: data.status || "In Progress",
        isFeatured: data.isFeatured === "true" || data.isFeatured === true ? 1 : 0,
        isPublished: data.isPublished === "false" || data.isPublished === false ? 0 : 1,
        displayOrder: parseInt(data.displayOrder) || 0,
        usedTechnologies: data.usedTechnologies || null,
        githubUrl: data.githubUrl || null,
        downloadUrl: data.downloadUrl || null,
        liveDemoUrl: data.liveDemoUrl || null,
        documentationUrl: data.documentationUrl || null,
        videoDemoUrl: data.videoDemoUrl || null,
        imageUrl: coverImage,
        galleryImages,
      };

      const newProject = await ProjectRepository.create(projectToAdd);
      return { status: 201, data: newProject };
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.name === "SequelizeValidationError") {
        return {
          status: 400,
          data: { message: "Validation Error", errors: error.errors.map((e) => e.message) },
        };
      }
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async updateProject(id, data, files) {
    try {
      const project = await ProjectRepository.findById(id);
      if (!project) return { status: 404, data: { message: "Project not found" } };

      const fileArray = Array.isArray(files) ? files : files ? [files] : [];
      let coverImage = project.imageUrl;
      let galleryImages = project.galleryImages || [];

      if (fileArray.length > 0) {
        const imageUrls = await uploadImages(fileArray);
        if (imageUrls.length > 0) {
          coverImage = imageUrls[0];
          galleryImages = [...galleryImages, ...imageUrls.slice(1)];
        }
      }

      // Allow replacing gallery entirely if galleryImages field is sent as JSON
      if (data.galleryImages !== undefined) {
        const parsed = parseJsonField(data.galleryImages);
        if (Array.isArray(parsed)) galleryImages = parsed;
      }

      const techTags = data.techTags !== undefined ? parseJsonField(data.techTags) : project.techTags;
      const impactMetrics = data.impactMetrics !== undefined ? parseJsonField(data.impactMetrics) : project.impactMetrics;

      const updateData = {
        name: data.name || project.name,
        description: data.description !== undefined ? data.description : project.description,
        shortDescription: data.shortDescription !== undefined ? data.shortDescription : project.shortDescription,
        detailedDescription: data.detailedDescription !== undefined ? data.detailedDescription : project.detailedDescription,
        category: data.category || project.category,
        techTags: techTags || [],
        impactMetrics: impactMetrics || [],
        status: data.status || project.status,
        isFeatured: data.isFeatured !== undefined ? (data.isFeatured === "true" || data.isFeatured === true ? 1 : 0) : project.isFeatured,
        isPublished: data.isPublished !== undefined ? (data.isPublished === "false" || data.isPublished === false ? 0 : 1) : project.isPublished,
        displayOrder: data.displayOrder !== undefined ? parseInt(data.displayOrder) : project.displayOrder,
        usedTechnologies: data.usedTechnologies !== undefined ? data.usedTechnologies : project.usedTechnologies,
        githubUrl: data.githubUrl !== undefined ? data.githubUrl : project.githubUrl,
        downloadUrl: data.downloadUrl !== undefined ? data.downloadUrl : project.downloadUrl,
        liveDemoUrl: data.liveDemoUrl !== undefined ? data.liveDemoUrl : project.liveDemoUrl,
        documentationUrl: data.documentationUrl !== undefined ? data.documentationUrl : project.documentationUrl,
        videoDemoUrl: data.videoDemoUrl !== undefined ? data.videoDemoUrl : project.videoDemoUrl,
        imageUrl: coverImage,
        galleryImages,
      };

      // Regenerate slug if name changed
      if (data.name && data.name !== project.name) {
        updateData.slug = await uniqueSlug(data.name);
      }

      const updatedProject = await ProjectRepository.update(id, updateData);
      return { status: 200, data: updatedProject };
    } catch (error) {
      console.error("Error updating project:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async deleteProject(id) {
    try {
      const result = await ProjectRepository.delete(id);
      if (!result) return { status: 404, data: { message: "Project not found" } };
      return { status: 204, data: "Deleted" };
    } catch (error) {
      console.error("Error deleting project:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async toggleFeatured(id) {
    try {
      const project = await ProjectRepository.toggleFeatured(id);
      if (!project) return { status: 404, data: { message: "Project not found" } };
      return { status: 200, data: project };
    } catch (error) {
      console.error("Error toggling featured:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async togglePublished(id) {
    try {
      const project = await ProjectRepository.togglePublished(id);
      if (!project) return { status: 404, data: { message: "Project not found" } };
      return { status: 200, data: project };
    } catch (error) {
      console.error("Error toggling published:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async reorderProjects(orderedList) {
    try {
      await ProjectRepository.reorder(orderedList);
      return { status: 200, data: { message: "Order updated" } };
    } catch (error) {
      console.error("Error reordering projects:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },
};
