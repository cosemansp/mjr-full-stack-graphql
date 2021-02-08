# mjr-full-stack-graphql

## Sample DB

https://github.com/tmcnab/northwind-mongo/archive/master.zip

```bash
mongoimport -d Northwind -c categories --type csv --file categories.csv --headerline
mongoimport -d Northwind -c customers --type csv --file customers.csv --headerline
mongoimport -d Northwind -c employee-territories --type csv --file employee-territories.csv --headerline
mongoimport -d Northwind -c employees --type csv --file employees.csv --headerline
mongoimport -d Northwind -c northwind --type csv --file northwind.csv --headerline
mongoimport -d Northwind -c order-details --type csv --file order-details.csv --headerline
mongoimport -d Northwind -c orders --type csv --file orders.csv --headerline
mongoimport -d Northwind -c products --type csv --file products.csv --headerline
mongoimport -d Northwind -c regions --type csv --file regions.csv --headerline
mongoimport -d Northwind -c shippers --type csv --file shippers.csv --headerline
mongoimport -d Northwind -c suppliers --type csv --file suppliers.csv --headerline
mongoimport -d Northwind -c territories --type csv --file territories.csv --headerline
```

## Express Server as base

```ts
import express, { Request, Response } from 'express';
import pkg from '../package.json';

// Create Express App
const app = express();

// routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    name: pkg.name,
  });
});

// Listen to http
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
```

## Getting started with Apollo GraphQL

```bash
# install dependencies
yarn add apollo-server graphql
```

```ts
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

// Add resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Graphql Server ready at ${url}`);
});
```

## Use Apollo Server with Express

See [Apollo Server middleware](https://www.apollographql.com/docs/apollo-server/integrations/middleware/)

```bash
# install dependencies
yarn add apollo-server-express
```

```js
const { ApolloServer, gql } = require('apollo-server-express');

// Create Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express
const app = express();

// Attach graphql to express
server.applyMiddleware({ app });

// Listen to server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
```

## Apollo Federation

### Prepare services

```js
import { buildFederatedSchema } from '@apollo/federation';

// ...

// Create the Apollo Graphql server
// and use federated schema
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});
```

### Setup Gateway

```js
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'mflex', url: 'http://localhost:8000/graphql' },
    //  { name: 'swapi', url: 'http://localhost:8002/graphql' },
  ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Graphql Gateway ready at ${url}`);
});


```
