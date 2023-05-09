const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const userModel = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      departmentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Department",
          key: "id",
        },
      },
      specificationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Specification",
          key: "id",
        },
      },
      supervisor: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      userCode: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(100),
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
        allowNull: true,
      },
      updatedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "User",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "PK_user",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};

module.exports = userModel;
