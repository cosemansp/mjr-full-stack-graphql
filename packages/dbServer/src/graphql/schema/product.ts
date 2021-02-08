import { gql } from 'apollo-server';
import { IProduct, ProductModel, CategoryModel, ICategory } from '../../models';
import { Resolvers } from '../types';
import { categoryMapper } from './category';

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    unitPrice: Float
    unitsInStock: Int
    unitsOnOrder: Int
    category: Category
  }

  type Query {
    products(limit: Int, offset: Int): [Product]
  }
`;

const productMapper = (source: IProduct) => {
  if (!source) {
    return null;
  }
  return {
    id: source.ProductID.toString(),
    name: source.ProductName,
    unitPrice: source.UnitPrice,
    unitsInStock: source.UnitsInStock,
    unitsOnOrder: source.UnitsOnOrder,
    category: {
      id: source.CategoryID.toString(),
    },
  };
};

const resolvers: Resolvers = {
  Query: {
    products: async (_root, args) => {
      const products = await ProductModel.find().skip(args.offset).limit(args.limit).lean<IProduct>();
      return products.map((item) => productMapper(item));
    },
  },
  Product: {
    category: async (product) => {
      const category = await CategoryModel.findOne({ CategoryID: +product.category.id }).lean<ICategory>();
      return categoryMapper(category);
    },
  },
};

export { typeDefs, resolvers };
