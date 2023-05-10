const models = require("../models/models");
const resolvers = {
  Query: {
    // department
    departments: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllDepartments();
    },
    departmentId: async (parent, args, context) => {
      return await context.databaseGraphQL.getDepartmentsId(args.id);
    },
    // partialDay
    partialDays: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllPartialDays();
    },
    partialDayId: async (parent, args, context) => {
      return await context.databaseGraphQL.getPartialDayId(args.id);
    },
    // request
    requests: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequests();
    },
    requestById: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestId(args.id);
    },
    // requestReason
    requestReasons: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequestReasons();
    },
    requestReasonId: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestReasonId(args.id);
    },
    //requestTypes
    requestTypes: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequestTypes();
    },
    requestTypeId: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestTypeId(args.id);
    },
    // specifications
    specifications: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllSpecifications();
    },
    specificationId: async (parent, args, context) => {
      return await context.databaseGraphQL.getSpecificationId(args.id);
    },
    // status
    status: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllStatus();
    },
    statusId: async (parent, args, context) => {
      return await context.databaseGraphQL.getStatusId(args.id);
    },
    // User
    users: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllUser();
    },
    userId: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId();
    },
  },
  Department: {
    users: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllUser({
        departmentId: parent.id,
      });
    },
  },
  PartialDay: {
    requests: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequests({
        partialDayId: parent.id,
      });
    },
  },
  Request: {
    requestTypeId: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestTypeId(
        parent.requestTypeId
      );
    },
    requestReasonId: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestReasonId(
        parent.requestReasonId
      );
    },
    partialDayId: async (parent, args, context) => {
      return await context.databaseGraphQL.getPartialDayId(parent.partialDayId);
    },
    userId: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(parent.userId);
    },
    statusId: async (parent, args, context) => {
      return await context.databaseGraphQL.getStatusId(parent.statusId);
    },
  },
  RequestReason: {
    requestTypeId: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestTypeId(
        parent.requestTypeId
      );
    },
    requests: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequests({
        requests: parent.id,
      });
    },
  },
  RequestType: {
    requestReasons: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllRequestReasons({
        requestReasons: parent.id,
      });
    },
  },

  Specification: {
    users: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllUser({
        users: parent.id,
      });
    },
  },
  User: {
    departmentId: async (parent, args, context) => {
      return await context.databaseGraphQL.getDepartmentsId(
        parent.departmentId
      );
    },
    specificationId: async (parent, args, context) => {
      return await context.databaseGraphQL.getSpecificationId(
        parent.specificationId
      );
    },
  },
  Mutation: {
    createDepartment: async (_, { name, createdBy, updatedBy }, context) => {
      return await context.databaseGraphQL.createDepartment(_, {
        name,
        createdBy,
        updatedBy,
      });
    },
    // createPartialDay: (parent, args) => {
    //   return models.PartialDay.create(args.input);
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
      },
      context
    ) => {
      return await context.databaseGraphQL.createRequest(_, {
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
      });
    },
    createRequestReason: async (
      _,
      { requestTypeId, name, createdBy, updatedBy },
      context
    ) => {
      return await context.databaseGraphQL.createRequestReason(_, {
        requestTypeId,
        name,
        description,
        createdBy,
        updatedBy,
      });
    },
    createRequestType: async (
      _,
      { name, description, createdBy, updatedBy },
      context
    ) => {
      return await context.databaseGraphQL.createRequestType(_, {
        name,
        description,
        createdBy,
        updatedBy,
      });
    },
    createSpecification: async (
      _,
      { name, createdBy, updatedBy, displayOrder },
      context
    ) => {
      return await context.databaseGraphQL.createSpecification(_, {
        name,
        createdBy,
        updatedBy,
        displayOrder,
      });
    },
    createStatus: async (
      _,
      { name, createdBy, updatedBy, displayOrder },
      context
    ) => {
      return await context.databaseGraphQL.createStatus(_, {
        name,
        createdBy,
        updatedBy,
        displayOrder,
      });
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
      },
      context
    ) => {
      return await context.databaseGraphQL.createUser(_, {
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
      });
    },
    deleteDepartment: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteDepartment(_, { id });
    },
    deleteRequest: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteRequest(_, { id });
    },
    deleteUser: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteUser(_, { id });
    },
    updateDepartment: async (_, { id, name, updatedBy }, context) => {
      return await context.databaseGraphQL.updateDepartment(_, {
        id,
        name,
        updatedBy,
      });
    },
    updatePartialDay: async (_, { id, name, updatedBy }, context) => {
      return await context.databaseGraphQL.updatePartialDay(_, {
        id,
        name,
        updatedBy,
      });
    },
    updateRequest: async (
      _,
      {
        id,
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
        updatedBy,
        expectedDate,
        startDate,
        endDate,
      },
      context
    ) => {
      return await context.databaseGraphQL.updateRequest(_, {
        id,
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
        updatedBy,
        expectedDate,
        startDate,
        endDate,
      });
    },
    updateRequestReason: async (
      _,
      { id, requestTypeId, name, updatedBy },
      context
    ) => {
      return await context.databaseGraphQL.updateRequestReason(_, {
        id,
        requestTypeId,
        name,
        updatedBy,
      });
    },
    updateRequestType: async (
      _,
      { id, name, description, updatedBy },
      context
    ) => {
      return await context.databaseGraphQL.updateRequestType(_, {
        id,
        name,
        description,
        updatedBy,
      });
    },
    updateSpecification: async (_, { id, name, updatedBy }, context) => {
      return await context.databaseGraphQL.updateSpecification(_, {
        id,
        name,
        updatedBy,
      });
    },
    updateStatus: async (_, { id, name, updatedBy }, context) => {
      return await context.databaseGraphQL.updateStatus(_, {
        id,
        name,
        updatedBy,
      });
    },
    updateUser: async (
      _,
      {
        id,
        departmentId,
        specificationId,
        supervisor,
        userCode,
        email,
        userName,
        address,
        updatedBy,
        birthday,
        phoneNumber,
      },
      context
    ) => {
      return await context.databaseGraphQL.updateUser(_, {
        id,
        departmentId,
        specificationId,
        supervisor,
        userCode,
        email,
        userName,
        address,
        updatedBy,
        birthday,
        phoneNumber,
      });
    },
  },
};

module.exports = resolvers;
