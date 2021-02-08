import { makeExecutableSchema } from 'apollo-server';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Product, resolvers as productResolvers } from './schema/product';
import { typeDefs as Category, resolvers as categoryResolvers } from './schema/category';

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Root, Product, Category],
  resolvers: [productResolvers, rootResolvers, categoryResolvers],
  allowUndefinedInResolve: true,
});

export default graphqlSchema;
