const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const statusModel = (sequelize) => {
  return sequelize.define(
    "Status",
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
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "Status",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_status",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = statusModel;
