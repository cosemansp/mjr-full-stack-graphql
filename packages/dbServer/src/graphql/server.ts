import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

// Create the Apollo Graphql server
const graphqlServer = new ApolloServer({
  schema,
});

export default graphqlServer;
