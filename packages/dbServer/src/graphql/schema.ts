import { makeExecutableSchema } from 'apollo-server';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Product, resolvers as productResolvers } from './schema/product';
import { typeDefs as Category, resolvers as categoryResolvers } from './schema/category';
import { typeDefs as Node, resolvers as nodeResolvers } from './schema/node';

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Root, Product, Category, Node],
  resolvers: [productResolvers, rootResolvers, categoryResolvers, nodeResolvers],
  allowUndefinedInResolve: true,
});

export default graphqlSchema;
