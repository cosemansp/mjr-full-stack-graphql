import { gql } from 'apollo-server';
import { DateTimeResolver } from 'graphql-scalars';
import { Resolvers } from '../types';

// Root Schema
const typeDefs = gql`
  directive @isAuthenticated on FIELD | FIELD_DEFINITION
  directive @hasRole(role: String) on FIELD | FIELD_DEFINITION
  scalar DateTime

  type Address {
    street: String
    city: String
    region: String
    postalCode: String
    country: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;

// Root Resolvers
const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
};

export { resolvers, typeDefs };
