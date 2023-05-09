const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const requestReasonModel = (sequelize) => {
  return sequelize.define(
    "RequestReason",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      requestTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "RequestType",
          key: "id",
        },
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
    },
    {
      sequelize,
      tableName: "RequestReason",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_RequestReason",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = requestReasonModel;
