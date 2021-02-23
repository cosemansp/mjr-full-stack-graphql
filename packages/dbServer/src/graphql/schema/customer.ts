import { gql } from 'apollo-server';
import { ICustomer, CustomerModel } from '../../models';
import { customerMapper } from '../loaders/customerLoader';
import { Resolvers } from '../types';

/* 
customers {
    companyName
    contactTitle
    contactName
    address {
      street
      city
      region
      postalCode
      country
    }
  }
*/

const typeDefs = gql`
  type Customer implements Node {
    id: ID!
    companyName: String
    contactTitle: String
    contactName: String
    address: Address
  }

  extend type Query {
    customers(limit: Int, offset: Int): [Customer]
  }
`;

const resolvers: Resolvers = {
  Query: {
    customers: async (_root, args) => {
      const obj = {};
      const x = obj.name.tst;
      const movies = await CustomerModel.find().skip(args.offset).limit(args.limit).lean<ICustomer>();
      return movies.map((item) => customerMapper(item));
    },
  },
};

export { typeDefs, resolvers };
