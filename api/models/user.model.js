const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
      validate: {
        isEmail: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
      validate: {
        notNull: true,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "refresh_token",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
module.exports = User;
