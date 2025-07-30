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
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "description",
      validate: {
        notNull: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "In Progress",
      field: "status",
      validate: {
        notNull: true,
      },
    },
    usedTechnologies: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "used_technologies",
      validate: {
        notNull: true,
      },
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "github_url",
      validate: {
        notNull: true,
      },
    },
    downloadUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "download_url",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
  },
  {
    tableName: "projects",
    timestamps: false,
  }
);

module.exports = Project;
