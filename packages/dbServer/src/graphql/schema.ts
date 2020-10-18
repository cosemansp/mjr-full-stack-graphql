import { makeExecutableSchema } from 'apollo-server';

import { typeDefs as Root, resolvers as rootResolvers } from './schema/root';
import { typeDefs as Book, resolvers as bookResolvers } from './schema/book';
import { typeDefs as Movie, resolvers as movieResolvers } from './schema/movie';
import { typeDefs as Comment, resolvers as commentResolvers } from './schema/comment';

// create GraphqlSchema
const graphqlSchema = makeExecutableSchema({
  typeDefs: [Root, Book, Movie, Comment],
  resolvers: [bookResolvers, movieResolvers, rootResolvers, commentResolvers],
  allowUndefinedInResolve: true,
});

export default graphqlSchema;
