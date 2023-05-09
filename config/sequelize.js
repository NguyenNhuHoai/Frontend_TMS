const Sequelize = require('sequelize');

const sequelize = new Sequelize('tms', 'postgres', '123123', {
  host: 'localhost',
  dialect: 'postgres' // loại cơ sở dữ liệu
});

module.exports = sequelize;
