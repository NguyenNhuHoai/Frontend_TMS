const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const specificationModel = (sequelize) => {
  return sequelize.define(
    "Specification",
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
        allowNull: true,
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Specification",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_Specification",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = specificationModel;
