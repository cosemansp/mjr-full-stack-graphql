import express, { Request, Response } from 'express';
import { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { connectDb, closeDb } from './db';
import schema from './graphql';

import pkg from '../package.json';

const app = express();

// Express routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    name: pkg.name,
  });
});

// Create the Apollo Graphql server
const graphqlServer = new ApolloServer({
  schema,
});

// Attach graphql to express
graphqlServer.applyMiddleware({ app });

let httpServer: Server;
connectDb().then(async () => {
  // Listen to http
  const PORT = 8000;
  httpServer = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  httpServer.close(() => {
    closeDb().then(() => {
      process.exit(0);
    });
  });
});
