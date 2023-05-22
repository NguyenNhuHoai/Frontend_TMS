const { gql } = require("apollo-server-express");
const DateType = require("./DataTypeSchema");

const typeDefs = gql`
  scalar Date
  # Department Query
  type Department {
    id: ID!
    name: String
    createdBy: String
    updatedBy: String
    createdDate: String
    updatedDate: String
    users: [User]
  }
  #PartialDay Query
  type PartialDay {
    id: Int!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: String!
    updatedDate: String!
    requests: [Request]
  }

  type Request {
    id: ID!
    userId: User!
    requestType: RequestType!
    requestReason: RequestReason!
    partialDay: PartialDay!
    status: Status!
    supervisor: User!
    approver: User!
    informTo: User!
    detailReason: String
    comment: String
    createdBy: String!
    updatedBy: String!
    expectedDate: String!
    startDate: Date!
    endDate: Date!
    createdDate: Date!
    updatedDate: Date!
  }
  #RequestReason
  type RequestReason {
    id: ID!
    requestType: RequestType!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: Date!
    updatedDate: Date!
    requests: [Request]
  }

  #RequestType
  type RequestType {
    id: ID!
    name: String!
    description: String
    createdBy: String!
    updatedBy: String!
    createdDate: Date!
    updatedDate: Date!
    requestReasons: [RequestReason]
  }

  input RequestTypeFilterInput {
    ids: [ID!]
  }

  #Specification
  type Specification {
    id: ID!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: Date
    updatedDate: Date
    users: [User]
  }
  #Status
  type Status {
    id: ID!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: Date
    updatedDate: Date
    displayOrder: Int!
  }

  input StatusFilterInput {
    ids: [ID!]
  }

  # User
  type User {
    id: ID!
    department: Department!
    specification: Specification!
    supervisor: ID
    userCode: String
    email: String!
    userName: String
    address: String
    createdBy: Date!
    updatedBy: Date!
    createdDate: Date
    updatedDate: Date
    birthday: Date!
    phoneNumber: String
    requests: [Request]
  }

  type PaginatedRequests {
    pageNumber: Int!
    pageSize: Int!
    totalPages: Int!
    totalCount: Int!
    requests: [Request!]!
  }

  #Query
  type Query {
    # department(id: ID!): Department
    departments: [Department!]!
    departmentId(id: ID!): Department
    #partialDay
    partialDays: [PartialDay!]!
    partialDayId(id: Int!): PartialDay
    #resquest
    requests: [Request!]!
    requestById(id: ID!): Request
    #requestReasons
    requestReasons: [RequestReason!]!
    requestReasonId(id: ID!): RequestReason
    #RequestType
    requestTypes: [RequestType!]!
    requestTypeId(id: ID!): RequestType
    #Specification
    specifications: [Specification!]!
    specificationId(id: ID!): Specification
    #Status
    status: [Status!]!
    statusId(id: ID!): Status
    # User
    users: [User!]!
    userId(id: ID!): User
    #Phân trang
    paginatedRequests(pageNumber: Int!, pageSize: Int!): PaginatedRequests!

    statuses(filter: StatusFilterInput): [Status]

    requestTypeIds(filter: StatusFilterInput): [RequestType]
  }
  #Mutation
  type Mutation {
    #createDepartment
    createDepartment(
      name: String!
      createdBy: String!
      updatedBy: String!
    ): Department!
    #  createPartialDay(input: PartialDayInput!): PartialDay!
    createRequest(
      userId: ID!
      requestTypeId: ID!
      requestReasonId: ID!
      partialDayId: Int!
      statusId: ID!
      supervisor: ID!
      approver: ID!
      informTo: ID
      detailReason: String
      comment: String
      createdBy: String!
      updatedBy: String!
      expectedDate: Date!
      startDate: Date!
      endDate: Date!
      createdDate: Date
      updatedDate: Date
    ): Request

    createRequestReason(
      requestTypeId: ID!
      name: String!
      createdBy: String!
      updatedBy: String!
    ): RequestReason

    createRequestType(
      name: String!
      description: String
      createdBy: String!
      updatedBy: String!
    ): RequestType

    createSpecification(
      name: String!
      createdBy: String!
      updatedBy: String!
    ): Specification

    createStatus(
      name: String!
      createdBy: String!
      updatedBy: String!
      displayOrder: Int!
    ): Status

    createUser(
      departmentId: ID!
      specificationId: ID!
      supervisor: ID!
      userCode: String!
      email: String!
      userName: String!
      address: String!
      createdBy: String!
      updatedBy: String!
      birthday: Date!
      phoneNumber: String!
    ): User

    #Delete
    deleteUser(id: ID!): Boolean
    deleteRequest(id: ID!): Boolean
    deleteDepartment(id: ID!): Boolean
    deletePartialDay(id: ID!): Boolean
    deleteStatus(id: ID!): Boolean
    deleteSpecification(id: ID!): Boolean
    deleteRequestType(id: ID!): Boolean
    deleteRequestReason(id: ID!): Boolean

    #update
    updateDepartment(id: ID!, name: String, updatedBy: String!): Department
    updatePartialDay(id: Int!, name: String, updatedBy: String!): PartialDay
    updateRequest(
      id: ID!
      userId: ID
      requestTypeId: ID
      requestReasonId: ID
      partialDayId: ID
      statusId: ID
      supervisor: ID
      approver: ID
      informTo: ID
      detailReason: String
      comment: String
      updatedBy: String!
      expectedDate: Date
      startDate: Date
      endDate: Date
    ): Request

    updateRequestReason(
      id: ID!
      requestTypeId: ID
      name: String
      updatedBy: String!
    ): RequestReason

    updateRequestType(
      id: ID!
      name: String
      description: String
      updatedBy: String!
    ): RequestType

    updateSpecification(id: ID!, name: String, updatedBy: String): Specification
    updateStatus(id: ID!, name: String, updatedBy: String!): Status
    updateUser(
      id: ID!
      departmentId: ID
      specificationId: ID
      supervisor: ID
      userCode: String
      email: String
      userName: String
      address: String
      updatedBy: String
      birthday: Date
      phoneNumber: String
    ): User
  }
`;

module.exports = typeDefs;
