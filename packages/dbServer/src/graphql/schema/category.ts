import { gql } from 'apollo-server';
import { ICategory, CategoryModel } from '../../models';
import { categoryMapper } from '../loaders/categoryLoader';
import { Resolvers } from '../types';

const typeDefs = gql`
  type Category implements Node {
    id: ID!
    name: String
    description: String
  }

  extend type Query {
    categories(limit: Int, offset: Int): [Category]
  }
`;

const resolvers: Resolvers = {
  Query: {
    categories: async (_root, args) => {
      const movies = await CategoryModel.find().skip(args.offset).limit(args.limit).lean<ICategory>();
      return movies.map((item) => categoryMapper(item));
    },
  },
};

export { typeDefs, resolvers };
