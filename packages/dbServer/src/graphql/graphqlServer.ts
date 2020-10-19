import { ApolloServer } from 'apollo-server-express';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';

import { Context, User } from './context';

import schema from './schema';

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
    };
  },
});

export default graphqlServer;