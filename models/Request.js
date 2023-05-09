const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const requestModel = (sequelize) => {
  return sequelize.define(
    "Request",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      requestTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "RequestType",
          key: "id",
        },
      },
      requestReasonId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "RequestReason",
          key: "id",
        },
      },
      partialDayId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PartialDay",
          key: "id",
        },
      },
      statusId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Status",
          key: "id",
        },
      },
      supervisor: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      approver: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      informTo: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      detailReason: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      comment: {
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
      expectedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
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
      tableName: "Request",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_Request",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = requestModel;
