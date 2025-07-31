const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // username
   // password
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT, // specify port
      dialect: "mysql",
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
