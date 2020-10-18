import { makeExecutableSchema } from 'apollo-server';

import { typeDefs as Book, resolvers as bookResolvers } from './schema/book';
import { typeDefs as Movie, resolvers as movieResolvers } from './schema/movie';

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Book, Movie],
  resolvers: [bookResolvers, movieResolvers],
  allowUndefinedInResolve: true,
});

export default graphqlSchema;
