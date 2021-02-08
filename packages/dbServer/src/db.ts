/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1/Northwind';
const connectDb = async () => {
  const result = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set('debug', (collectionName: string, method: string, query: any, doc: any) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
  return result;
};

const closeDb = () => {
  return mongoose.connection.close();
};

export { connectDb, closeDb };
