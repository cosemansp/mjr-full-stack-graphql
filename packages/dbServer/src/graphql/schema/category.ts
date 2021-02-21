/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'apollo-server';
import { fromGlobalId } from '../../globalId';
import { ICategory, CategoryModel, ProductModel, IProduct } from '../../models';
import { productMapper } from '../loaders';
import { categoryMapper } from '../loaders/categoryLoader';
import { Resolvers } from '../types';

/* 
categories {
    name
    description
    products {
      id
      name
    }
  }
*/

const typeDefs = gql`
  type Category implements Node {
    id: ID!
    name: String
    description: String
    products: [Product]
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
  Category: {
    products: async (category, args, context) => {
      const { id } = fromGlobalId(category.id);
      const result = await ProductModel.find({ categoryID: +id }).select('productID');
      const productIds = result.map((item) => item.productID.toString());
      const products = await context.loaders.product.loadMany(productIds);
      return products.map((item) => productMapper(item as IProduct)) as any;
    },
  },
};

export { typeDefs, resolvers };
