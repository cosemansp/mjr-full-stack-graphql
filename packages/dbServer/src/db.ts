import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1/sample_mflix';
const connectDb = () => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const closeDb = () => {
  return mongoose.connection.close();
};

export { connectDb, closeDb };
