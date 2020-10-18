import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'mflex', url: 'http://localhost:8001/graphql' },
    { name: 'swapi', url: 'http://localhost:8002/graphql' },
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
