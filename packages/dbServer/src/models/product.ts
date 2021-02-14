/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface IProduct extends Document {
  _id: string;
  name: string;
  productID: number;
  supplierID: number;
  categoryID: number;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: number;
}

const ProductSchema: Schema = new Schema({
  productID: { type: Number },
  name: { type: String },
  supplierID: { type: Number },
  categoryID: { type: Number },
  unitPrice: { type: Number },
  unitsInStock: { type: Number },
  unitsOnOrder: { type: Number },
  reorderLevel: { type: Number },
  discontinued: { type: Number },
  kind: { type: String, get: () => 'Product' },
});

ProductSchema.plugin(mongooseLeanId);
ProductSchema.plugin(mongooseLeanGetters);

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
