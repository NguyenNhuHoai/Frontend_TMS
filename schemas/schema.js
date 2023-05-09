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
    requestTypeId: RequestType!
    requestReasonId: RequestReason!
    partialDayId: PartialDay!
    statusId: Status!
    supervisor: ID!
    approver: ID!
    informTo: ID!
    detailReason: String
    comment: String
    createdBy: String!
    updatedBy: String!
    expectedDate: String!
    startDate: String!
    endDate: String!
    createdDate: String!
    updatedDate: String!
  }
  #RequestReason
  type RequestReason {
    id: ID!
    requestTypeId: RequestType!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: String!
    updatedDate: String!
    requests: [Request]
  }

  #RequestType
  type RequestType {
    id: ID!
    name: String!
    description: String
    createdBy: String!
    updatedBy: String!
    createdDate: String!
    updatedDate: String!
    requestReasons: [RequestReason]
  }

  #Specification
  type Specification {
    id: ID!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: String
    updatedDate: String
    users: [User]
  }
  #Status
  type Status {
    id: ID!
    name: String!
    createdBy: String!
    updatedBy: String!
    createdDate: String
    updatedDate: String
    displayOrder: Int!
  }
  # User
  type User {
    id: ID!
    departmentId: Department!
    specificationId: Specification!
    supervisor: ID
    userCode: String
    email: String!
    userName: String!
    address: String
    createdBy: String!
    updatedBy: String!
    createdDate: Date
    updatedDate: Date
    birthday: Date!
    phoneNumber: String
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
  }

  # input PartialDayInput {
  #   name: String!
  #   createdBy: String!
  #   updatedBy: String!
  # }

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
  }
`;

module.exports = typeDefs;
