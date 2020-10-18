import { gql } from 'apollo-server';
import { DateTimeResolver } from 'graphql-scalars';
import { Resolvers } from '../types';

// Root Schema
const typeDefs = gql`
  scalar DateTime
`;

// Root Resolvers
const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
};

export { resolvers, typeDefs };
