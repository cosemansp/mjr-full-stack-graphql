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
    movies(limit: Int, offset: Int): [Movie!]!
  }
`;

// Movie resolvers
const resolvers = {
  Query: {
    movies: (_root: any, args: any) => {
      console.log(args);
      return Movie.find({}).skip(args.offset).limit(args.limit);
    },
  },
};

export { resolvers, typeDefs };
