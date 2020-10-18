import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

export interface IMovie extends Document {
  _id: string;
  title: string;
  plot: string;
  fullplot: string;
  released: Date;
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

MovieSchema.plugin(mongooseLeanId);

export const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema);
