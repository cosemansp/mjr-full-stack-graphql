import { gql } from 'apollo-server';
import { Resolvers } from '../types';

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

const resolvers: Resolvers = {
  Query: {
    books: (_root, args, context) => {
      if (!context.user) {
        return null;
      }
      return books;
    },
  },
};

export { typeDefs, resolvers };
