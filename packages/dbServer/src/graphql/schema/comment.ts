import { gql } from 'apollo-server';

// Create the graphql schema
const typeDefs = gql`
  type Comment {
    id: ID
    name: String
    email: String
    text: String
    date: DateTime
  }
`;

const resolvers = {};

export { typeDefs, resolvers };
