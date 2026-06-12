const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
      validate: { notNull: true },
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      field: "slug",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "description",
      validate: { notNull: true },
    },
    shortDescription: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "short_description",
    },
    detailedDescription: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      field: "detailed_description",
    },
    impactMetrics: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "impact_metrics",
      get() {
        const raw = this.getDataValue("impactMetrics");
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(value) {
        this.setDataValue(
          "impactMetrics",
          Array.isArray(value) ? JSON.stringify(value) : value
        );
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Other",
      field: "category",
    },
    techTags: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "tech_tags",
      get() {
        const raw = this.getDataValue("techTags");
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(value) {
        this.setDataValue(
          "techTags",
          Array.isArray(value) ? JSON.stringify(value) : value
        );
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "In Progress",
      field: "status",
      validate: { notNull: true },
    },
    isFeatured: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      field: "is_featured",
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "display_order",
    },
    isPublished: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      field: "is_published",
    },
    usedTechnologies: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "used_technologies",
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "github_url",
    },
    downloadUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "download_url",
    },
    liveDemoUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: "live_demo_url",
    },
    documentationUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: "documentation_url",
    },
    videoDemoUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: "video_demo_url",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
    galleryImages: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "gallery_images",
      get() {
        const raw = this.getDataValue("galleryImages");
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(value) {
        this.setDataValue(
          "galleryImages",
          Array.isArray(value) ? JSON.stringify(value) : value
        );
      },
    },
  },
  {
    tableName: "projects",
    timestamps: false,
  }
);

module.exports = Project;
