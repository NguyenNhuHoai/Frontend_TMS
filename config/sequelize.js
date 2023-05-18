const Sequelize = require("sequelize");

const sequelize = new Sequelize("tms", "admin", "123456ab", {
  host: "103.162.20.101",
  dialect: "postgres", // loại cơ sở dữ liệu
  logging: false,
});

module.exports = sequelize;
