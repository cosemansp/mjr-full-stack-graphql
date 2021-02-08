import { ApolloServer } from 'apollo-server-express';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';
import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';

import { Context, User } from './context';

import schema from './schema';
import { CategoryModel, ICategory } from '../models';

const verifyAndDecodeToken = (req: Request): User => {
  const { authorization } = req.headers as any;
  const token = authorization ? authorization.split(' ')[1] : '';
  if (!token) {
    return null;
  }

  try {
    return decode(token) as User;
  } catch (err) {
    // we don't throw an error here
    // the auth directives will handle the authorization
    console.log('Failed to verify accessToken, ERR: ', err.message);
    return null;
  }
};

const createLoaders = () => {
  return {
    categories: new DataLoader<number, ICategory[]>(async (ids) => {
      // load comments
      const query: unknown = {
        CategoryID: { $in: ids },
      };
      const categories = await CategoryModel.find(query).lean<ICategory>();

      // make sure we return items in the right order
      const itemsById = keyBy(categories, 'CategoryID');
      return ids.map((id) => itemsById[id]);
    }),
  };
};

// Create the Apollo Graphql server
const graphqlServer = new ApolloServer({
  schema,
  context: ({ res, req }): Context => {
    const user = verifyAndDecodeToken(req);
    return {
      req,
      res,
      user,
      loaders: createLoaders(),
    };
  },
});

export default graphqlServer;
