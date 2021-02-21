import { makeExecutableSchema, AuthenticationError } from 'apollo-server';
import { AuthDirective } from 'graphql-directive-auth';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Product, resolvers as productResolvers } from './schema/product';
import { typeDefs as Category, resolvers as categoryResolvers } from './schema/category';
import { typeDefs as Customer, resolvers as customerResolvers } from './schema/customer';
import { typeDefs as Order, resolvers as orderResolvers } from './schema/order';
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
  typeDefs: [Root, Product, Category, Node, Viewer, Order, Customer],
  resolvers: [
    productResolvers,
    rootResolvers,
    categoryResolvers,
    nodeResolvers,
    viewerResolvers,
    orderResolvers,
    customerResolvers,
  ],
  allowUndefinedInResolve: true,
  schemaDirectives: {
    ...customAuth,
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export default graphqlSchema;
