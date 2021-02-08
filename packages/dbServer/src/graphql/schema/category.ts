import { gql } from 'apollo-server';
import { ICategory, CategoryModel } from '../../models';
import { Resolvers } from '../types';

const typeDefs = gql`
  type Category {
    id: ID
    name: String
    description: String
  }

  extend type Query {
    categories(limit: Int, offset: Int): [Category]
  }
`;

export const categoryMapper = (category: ICategory) => {
  if (!category) {
    return null;
  }
  return {
    id: category.CategoryID.toString(),
    name: category.CategoryName,
    description: category.Description,
  };
};

const resolvers: Resolvers = {
  Query: {
    categories: async (_root, args) => {
      const movies = await CategoryModel.find().skip(args.offset).limit(args.limit).lean<ICategory>();
      return movies.map((item) => categoryMapper(item));
    },
  },
};

export { typeDefs, resolvers };
