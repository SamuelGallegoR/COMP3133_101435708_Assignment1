const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`;

module.exports = userSchema;
