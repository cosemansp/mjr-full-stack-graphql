/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface ICategory extends Document {
  _id: string;
  name: string;
  categoryID: number;
  description: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String },
  categoryID: { type: Number },
  description: { type: String },
  kind: { type: String, get: () => 'Category' },
});

CategorySchema.plugin(mongooseLeanId);
CategorySchema.plugin(mongooseLeanGetters);

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
