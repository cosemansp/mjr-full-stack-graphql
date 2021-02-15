/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'apollo-server';
import { findPaginated } from '../../dbCursor';
import { fromGlobalId } from '../../globalId';
import { IProduct, ProductModel, CategoryModel, ICategory } from '../../models';
import { productMapper, categoryMapper } from '../loaders';
import { Resolvers } from '../types';

const typeDefs = gql`
  ## Queries & Types -----------------------------

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
    # Get all products (simple paging)
    products(limit: Int, offset: Int): [Product]

    # Get all products
    allProducts(first: Int = 10, after: String, before: String): ProductConnection
  }

  ## Mutations, Input & Types -----------------------------

  input CreateProductInput {
    name: String
    unitPrice: Float
    unitsInStock: Int
    categoryID: ID!
  }

  type CreateProductPayload {
    product: Product
  }

  type Mutation {
    createProduct(input: CreateProductInput): CreateProductPayload
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
  Mutation: {
    createProduct: async (_root, args): Promise<any> => {
      // get category
      const { id: categoryID } = fromGlobalId(args.input.categoryID);
      const category = await CategoryModel.findOne({ categoryID: +categoryID });
      if (!category) {
        throw Error('invalid categoryID');
      }

      // get last added product (to inc productID)
      const lastProductAdded = await ProductModel.find({}, { productID: 1, _id: 0 }).sort({ productID: -1 }).limit(1);

      // create product
      const product = new ProductModel({
        name: args.input.name,
        unitPrice: args.input.unitPrice,
        unitsInStock: args.input.unitsInStock,
        unitsOnOrder: 0,
        reorderLevel: 0,
        discontinued: 0,
        productID: (lastProductAdded[0]?.productID || 0) + 1,
        categoryID: category.categoryID,
        supplierID: null,
      });
      await product.save();

      return {
        product: productMapper(product.toObject()),
      };
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
