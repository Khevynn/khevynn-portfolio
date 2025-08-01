const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // specify port
    dialect: "mysql", // explicitly specify the dialect
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // or true for SQL debug output
  }
);

module.exports = sequelize;
