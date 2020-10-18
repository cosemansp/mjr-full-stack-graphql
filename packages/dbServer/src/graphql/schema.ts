import { makeExecutableSchema } from 'apollo-server';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Book, resolvers as bookResolvers } from './schema/book';
import { typeDefs as Movie, resolvers as movieResolvers } from './schema/movie';

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Root, Book, Movie],
  resolvers: [bookResolvers, movieResolvers, rootResolvers],
  allowUndefinedInResolve: true,
});

export default graphqlSchema;
