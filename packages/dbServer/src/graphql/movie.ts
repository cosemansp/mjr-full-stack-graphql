import { gql } from 'apollo-server';
import { Movie } from '../models';

// Movie Schema
const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    plot: String
    released: String
  }
  extend type Query {
    movies: [Movie]
  }
`;

// Movie resolvers
const resolvers = {
  Query: {
    movies: () => {
      return Movie.find({}).limit(100);
    },
  },
};

export { resolvers, typeDefs };
