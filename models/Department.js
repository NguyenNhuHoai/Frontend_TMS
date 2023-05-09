const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const departmentModel = (sequelize) => {
  return sequelize.define(
    "Department",
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
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
    },
    {
      sequelize,
      tableName: "Department",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_Department",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = departmentModel;
