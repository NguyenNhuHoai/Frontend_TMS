const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const requestTypeModel = (sequelize) => {
  return sequelize.define(
    "RequestType",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "RequestType",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_RequestType",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = requestTypeModel;
