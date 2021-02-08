/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

export interface ICategory extends Document {
  _id: string;
  CategoryID: number;
  CategoryName: string;
  Description: string;
}

const CategorySchema: Schema = new Schema({
  CategoryId: { type: Number },
  CategoryName: { type: String },
  Description: { type: String },
});

CategorySchema.plugin(mongooseLeanId);

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
