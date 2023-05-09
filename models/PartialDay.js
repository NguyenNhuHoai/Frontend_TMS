const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const partialDayModel = (sequelize) => {
  return sequelize.define(
    "PartialDay",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        defaultValue: Sequelize.NOW,
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      tableName: "PartialDay",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_PartialDay",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = partialDayModel;
