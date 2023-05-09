const models = require("../models/models");
const Departement = require("../models/Department");
const databaseGraphQL = {
  // Methods GET
  // <------Departments---------->
  getAllDepartments: async () => await models.Department.findAll(),
  getDepartmentsId: async (id) => await models.Department.findByPk(id),
  // <------PartialDay----------->
  getAllPartialDays: async () => await models.PartialDay.findAll(),
  getPartialDayId: async (id) => await models.PartialDay.findByPk(id),
  // <------Request----------->
  getAllRequests: async () => await models.Request.findAll(),
  getRequestId: async (id) => await models.Request.findByPk(id),
  // <------RequestReason----------->
  getAllRequestReasons: async () => await models.RequestReason.findAll(),
  getRequestReasonId: async (id) => await models.RequestReason.findByPk(id),
  // <------RequestType----------->
  getAllRequestTypes: async () => await models.RequestType.findAll(),
  getRequestTypeId: async (id) => await models.RequestType.findByPk(id),
  // <------Specification----------->
  getAllSpecifications: async () => await models.Specification.findAll(),
  getSpecificationId: async (id) => await models.Specification.findByPk(id),
  // <------Status----------->
  getAllStatus: async () => await models.Status.findAll(),
  getStatusId: async (id) => await models.Status.findByPk(id),
  // <------User----------->
  getAllUser: async () => await models.User.findAll(),
  getUserId: async (id) => await models.User.findByPk(id),

  // Method Create
  // <-------- Create Departement ---------->
  createDepartment: async (_, { name, createdBy, updatedBy }) => {
    try {
      return models.Department.create({
        name: name,
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  // craetePartialDay: async (_, { name, createdBy, updatedBy }) => {
  //   try {
  //     return models.PartialDay.create({
  //       name: name,
  //       createdBy: createdBy,
  //       updatedBy: updatedBy,
  //     });
  //   } catch (error) {
  //     throw new UserInputError(error.message);
  //   }
  // },
  createRequest: async (
    _,
    {
      userId,
      requestTypeId,
      requestReasonId,
      partialDayId,
      statusId,
      supervisor,
      approver,
      informTo,
      detailReason,
      comment,
      createdBy,
      updatedBy,
      expectedDate,
      startDate,
      endDate,
    }
  ) => {
    try {
      return models.Request.create({
        userId: userId,
        requestTypeId: requestTypeId,
        requestReasonId: requestReasonId,
        partialDayId: partialDayId,
        statusId: statusId,
        supervisor: supervisor,
        approver: approver,
        informTo: informTo,
        detailReason: detailReason,
        comment: comment,
        createdBy: createdBy,
        updatedBy: updatedBy,
        expectedDate: expectedDate,
        startDate: startDate,
        endDate: endDate,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  createRequestReason: async (
    _,
    { requestTypeId, name, createdBy, updatedBy }
  ) => {
    try {
      return models.RequestReason.create({
        requestTypeId: requestTypeId,
        name: name,
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  createRequestType: async (_, { name, description, createdBy, updatedBy }) => {
    try {
      return models.RequestType.create({
        name: name,
        description: description,
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  createSpecification: async (_, { name, createdBy, updatedBy }) => {
    try {
      return models.Specification.create({
        name: name,
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  createStatus: async (_, { name, createdBy, updatedBy, displayOrder }) => {
    try {
      return models.Status.create({
        name: name,
        createdBy: createdBy,
        updatedBy: updatedBy,
        displayOrder: displayOrder,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {
      throw new UserInputError(error.message);
    }
  },
  createUser: async (
    _,
    {
      departmentId,
      specificationId,
      supervisor,
      userCode,
      email,
      userName,
      address,
      createdBy,
      updatedBy,
      birthday,
      phoneNumber,
    }
  ) => {
    try {
      return models.User.create({
        departmentId: departmentId,
        specificationId: specificationId,
        supervisor: supervisor,
        userCode: userCode,
        email: email,
        userName: userName,
        address: address,
        createdBy: createdBy,
        updatedBy: updatedBy,
        birthday: birthday,
        phoneNumber: phoneNumber,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    } catch (error) {}
  },
  // <------------------Delete---------------------->
  deleteDepartment: (_, { id }) => {
    return models.Department.destroy({
      where: { id: id },
    }).then((result) => {
      return result === 1;
    });
  },

  deleteRequest: (_, { id }) => {
    return models.Request.destroy({
      where: { id: id },
      cascade: true,
    }).then((result) => {
      return result === 1;
    });
  },
  deleteUser: (_, { id }) => {
    return models.Request.findAll({
      where: {
        userId: id,
      },
    }).then((requests) => {
      requests.forEach((request) => {
        request.destroy();
      });
      models.User.destroy({
        where: {
          id: id,
        },
      });
    });
  },
};

module.exports = databaseGraphQL;
