import { gql } from 'apollo-server';
import { MovieModel, IMovie } from '../../models';
import { Resolvers, Movie } from '../types';

// Schema
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

const movieMapper = (model: IMovie): Movie => {
  return {
    ...model,
    released: model.released.toISOString(),
  };
};

// Resolvers
const resolvers: Resolvers = {
  Query: {
    movies: async (_root, args) => {
      console.log(args);
      const movies = await MovieModel.find({}).skip(args.offset).limit(args.limit).lean<IMovie>();
      return movies.map((item) => movieMapper(item));
    },
  },
};

export { resolvers, typeDefs };
