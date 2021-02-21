/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-express';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';
import depthLimit from 'graphql-depth-limit';

import { Context, User } from './context';

import schema from './schema';
import { categoryLoader, orderLoader, productLoader, customerLoader } from './loaders';

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

// Create the Apollo Graphql server
const graphqlServer = new ApolloServer({
  schema,
  context: ({ res, req }): Context => {
    const user = verifyAndDecodeToken(req);
    return {
      req,
      res,
      user,
      loaders: {
        category: categoryLoader,
        product: productLoader,
        order: orderLoader,
        customer: customerLoader,
      },
    };
  },
  tracing: true,
  validationRules: [depthLimit(5)],
});

export default graphqlServer;
