/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

export interface IProduct extends Document {
  _id: string;
  ProductID: number;
  ProductName: string;
  SupplierID: number;
  CategoryID: number;
  UnitPrice: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel: number;
  Discontinued: number;
}

const ProductSchema: Schema = new Schema({
  ProductID: { type: Number },
  ProductName: { type: String },
  SupplierID: { type: Number },
  CategoryID: { type: Number },
  UnitPrice: { type: Number },
  UnitsInStock: { type: Number },
  UnitsOnOrder: { type: Number },
  ReorderLevel: { type: Number },
  Discontinued: { type: Number },
});

ProductSchema.plugin(mongooseLeanId);

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
