import { makeExecutableSchema, AuthenticationError } from 'apollo-server';
import { AuthDirective } from 'graphql-directive-auth';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Product, resolvers as productResolvers } from './schema/product';
import { typeDefs as Category, resolvers as categoryResolvers } from './schema/category';
import { typeDefs as Node, resolvers as nodeResolvers } from './schema/node';
import { typeDefs as Viewer, resolvers as viewerResolvers } from './schema/viewer';
import { Context } from './context';

const customAuth = AuthDirective({
  authenticateFunc: (context: Context) => {
    if (!context.user) {
      throw new AuthenticationError('Not authenticated');
    }
  },
  checkRoleFunc: (context: Context, role: string) => {
    if (!context.user.role.includes(role)) {
      throw new AuthenticationError('Unauthorized access!');
    }
  },
});

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Root, Product, Category, Node, Viewer],
  resolvers: [productResolvers, rootResolvers, categoryResolvers, nodeResolvers, viewerResolvers],
  allowUndefinedInResolve: true,
  schemaDirectives: {
    ...customAuth,
  },
});

export default graphqlSchema;
