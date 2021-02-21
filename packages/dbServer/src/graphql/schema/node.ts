/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server';
import { fromGlobalId } from '../../globalId';
import { Resolvers } from '../types';

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  extend type Query {
    node(id: ID!): Node
  }
`;

const resolvers: Resolvers = {
  Query: {
    node: async (_root, args, context) => {
      const { type, id } = fromGlobalId(args.id);
      if (!context.loaders[type]) return null;
      return context.loaders[type].load(id);
    },
  },
  Node: {
    __resolveType(obj: any) {
      return obj.kind;
    },
  },
};

export { typeDefs, resolvers };
