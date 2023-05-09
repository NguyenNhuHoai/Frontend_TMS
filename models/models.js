const sequelize = require("../config/sequelize");
const Department = require("./Department");
const PartialDay = require("./PartialDay");
const Request = require("./Request");
const RequestReason = require("./RequestReason");
const Specification = require("./Specification");
const RequestType = require("./RequestType");
const Status = require("./Status");
const User = require("./User");

const models = {
  Department: Department(sequelize),
  PartialDay: PartialDay(sequelize),
  Request: Request(sequelize),
  RequestReason: RequestReason(sequelize),
  RequestType: RequestType(sequelize),
  Specification: Specification(sequelize),
  Status: Status(sequelize),
  User: User(sequelize),
};

module.exports = models;
