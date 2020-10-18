import express, { Request, Response } from 'express';
import { Server } from 'http';
import { connectDb, closeDb } from './db';
import { graphqlServer } from './graphql';

import pkg from '../package.json';

const app = express();

// Express routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    name: pkg.name,
  });
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
