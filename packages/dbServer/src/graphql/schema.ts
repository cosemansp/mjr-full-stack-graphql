import { gql } from 'apollo-server';

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

export default typeDefs;
