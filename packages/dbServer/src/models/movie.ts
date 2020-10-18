import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  plot: string;
  fullplot: string;
  released: string;
  rated: string;
  year: string;
  type: string;
  poster: string;
}

const MovieSchema: Schema = new Schema({
  title: { type: String },
  plot: { type: String },
  fullplot: { type: String },
  released: { type: Date },
  rated: { type: String },
  year: { type: String },
  type: { type: String },
  poster: { type: String },
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
