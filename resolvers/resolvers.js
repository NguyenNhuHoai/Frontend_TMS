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
    paginatedRequests: async (_, { pageNumber, pageSize }) => {
      const offset = (pageNumber - 1) * pageSize;
      const { count, rows } = await models.Request.findAndCountAll({
        limit: pageSize,
        offset,
      });
      const totalPages = Math.ceil(count / pageSize);
      return {
        pageNumber,
        pageSize,
        totalPages,
        totalCount: count,
        requests: rows,
      };
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

    requestTypeIds: async (_, { filter }) => {
      const { ids } = filter;
      try {
        const requestType = await models.RequestType.findAll({
          where: { id: ids },
        });
        return requestType;
      } catch (error) {
        throw new Error("Error retrieving statuses by multiple IDs");
      }
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
    statuses: async (_, { filter }) => {
      const { ids } = filter;
      try {
        const statuses = await models.Status.findAll({ where: { id: ids } });
        return statuses;
      } catch (error) {
        throw new Error("Error retrieving statuses by multiple IDs");
      }
    },
    // User
    users: async (parent, args, context) => {
      return await context.databaseGraphQL.getAllUser();
    },
    userId: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(args.id);
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
    requestType: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestTypeId(
        parent.requestTypeId
      );
    },
    requestReason: async (parent, args, context) => {
      return await context.databaseGraphQL.getRequestReasonId(
        parent.requestReasonId
      );
    },
    partialDay: async (parent, args, context) => {
      return await context.databaseGraphQL.getPartialDayId(parent.partialDayId);
    },
    userId: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(parent.userId);
    },
    status: async (parent, args, context) => {
      return await context.databaseGraphQL.getStatusId(parent.statusId);
    },
    approver: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(parent.approver);
    },
    supervisor: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(parent.supervisor);
    },
    informTo: async (parent, args, context) => {
      return await context.databaseGraphQL.getUserId(parent.informTo);
    },
  },
  RequestReason: {
    requestType: async (parent, args, context) => {
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
    department: async (parent, args, context) => {
      return await context.databaseGraphQL.getDepartmentsId(
        parent.departmentId
      );
    },
    specification: async (parent, args, context) => {
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
    deleteUser: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteUser(_, { id });
    },
    deleteRequest: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteRequest(_, { id });
    },
    deleteDepartment: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteDepartment(_, { id });
    },
    deletePartialDay: async (_, { id }, context) => {
      return await context.databaseGraphQL.deletePartialDay(_, { id });
    },
    deleteStatus: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteStatus(_, { id });
    },
    deleteSpecification: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteSpecification(_, { id });
    },
    deleteRequestType: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteRequestType(_, { id });
    },
    deleteRequestReason: async (_, { id }, context) => {
      return await context.databaseGraphQL.deleteRequestReason(_, { id });
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
