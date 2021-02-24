/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server';
import { Resolvers } from '../types';

// Sample token (http://jwtbuilder.jamiekurtz.com/)
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb0RldkNvIiwiaWF0IjoxNjEzMzczNjU5LCJleHAiOjE2NDQ5MDk2NTksImF1ZCI6InNhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsIkVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsIlJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdfQ.yAuhmBHhuGEi8xbik1upttgObr-mVkdgosjkEUakJXg

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    roles: [String!]!
  }

  extend type Query {
    viewer: User! @isAuthenticated
  }
`;

const resolvers: Resolvers = {
  Query: {
    viewer: async (_root, args, context) => {
      return {
        id: context.user.sub,
        firstName: context.user.firstName,
        lastName: context.user.lastName,
        email: context.user.email,
        roles: context.user.role,
      };
    },
  },
};

export { typeDefs, resolvers };
