/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
import { gql } from 'apollo-server';
import { MovieModel, CommentModel, IMovie, IComment } from '../../models';
import { Resolvers } from '../types';

// Schema
const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    plot: String
    released: DateTime
    comments: [Comment!]!
  }
  extend type Query {
    movies(limit: Int, offset: Int): [Movie!]!
  }
`;

// Resolvers
const resolvers: Resolvers = {
  Query: {
    movies: async (_root, args) => {
      const movies = await MovieModel.find().skip(args.offset).limit(args.limit).lean<IMovie>();
      return movies as any;
    },
  },
  Movie: {
    comments: async (movie) => {
      // console.log('movie', movie.id);
      const comments = await CommentModel.find({ movie_id: movie.id }).lean<IComment>();
      return comments;
    },
  },
};

export { resolvers, typeDefs };
