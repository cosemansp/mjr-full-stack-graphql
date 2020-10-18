import mongoose from 'mongoose';

import Movie from './models/movie';

const url = 'mongodb://127.0.0.1/sample_mflix';
const connectDb = () => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { Movie };

export { connectDb };

export default models;
