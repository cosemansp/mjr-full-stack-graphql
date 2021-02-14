/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'apollo-server';
import { findPaginated } from '../../dbCursor';
import { IProduct, ProductModel, CategoryModel, ICategory } from '../../models';
import { productMapper, categoryMapper } from '../loaders';
import { Resolvers } from '../types';

const typeDefs = gql`
  type Product implements Node {
    id: ID!
    name: String
    unitPrice: Float
    unitsInStock: Int
    unitsOnOrder: Int
    category: Category
  }

  type ProductEdge {
    # The item at the end of the edge
    node: Product

    # A cursor for use in pagination
    cursor: String!
  }

  type ProductConnection {
    # Information to aid in pagination.
    pageInfo: PageInfo!

    # A list of edges.
    edges: [ProductEdge]

    # A count of the total number of objects in this connection,
    # ignoring pagination. This allows a client to fetch the first
    # five objects by passing "5" as the argument to "first", then
    # fetch the total count so it could display "5 of 83", for example.
    totalCount: Int
  }

  type Query {
    products(limit: Int, offset: Int): [Product]
    allProducts(first: Int = 10, after: String, before: String): ProductConnection
  }
`;

const resolvers: Resolvers = {
  Query: {
    products: async (_root, args): Promise<any> => {
      const products = await ProductModel.find().skip(args.offset).limit(args.limit).lean<IProduct>();
      return products.map((item) => productMapper(item));
    },
    allProducts: async (_root, args): Promise<any> => {
      return findPaginated<IProduct>(ProductModel, {
        ...args,
        transformResponse: (docs) => docs.map((doc: any) => productMapper(doc)) as any,
      });
    },
  },
  Product: {
    category: async (product) => {
      const category = await CategoryModel.findOne({ categoryID: +product.category.id }).lean<ICategory>();
      return categoryMapper(category);
      // return context.loaders.category.load(+product.category.id) as any;
    },
  },
  ProductConnection: {
    totalCount: async () => {
      return ProductModel.countDocuments({});
    },
  },
};

export { typeDefs, resolvers };
