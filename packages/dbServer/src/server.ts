import express, { Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { connectDb } from './db';

import pkg from '../package.json';

const app = express();

// Express routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    name: pkg.name,
  });
});

const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
];

// Create the graphql schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// Add resolvers (matching schema)
const resolvers = {
  Query: {
    books: () => books,
  },
};

// Create the Apollo Graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Attach graphql to express
server.applyMiddleware({ app });

connectDb().then(async () => {
  // Listen to http
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
});
