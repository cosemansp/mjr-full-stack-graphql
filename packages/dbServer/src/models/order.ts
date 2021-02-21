/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface IAddress extends Document {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  _id: string;
  orderID: number;
  customerID: string;
  employeeID: string;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  shipVia: number;
  freight: number;
  shipName: string;
  shipAddress: IAddress;
  details: [
    {
      productID: string;
      unitPrice: number;
      quantity: number;
      discount: number;
    },
  ];
}

export const AddressSchema: Schema = new Schema({
  street: { type: String },
  city: { type: String },
  region: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const OrderSchema: Schema = new Schema({
  customerID: { type: Number },
  employeeID: { type: Number },
  orderDate: { type: String },
  requiredDate: { type: String },
  shippedDate: { type: String },
  shipVia: { type: Number },
  freight: { type: Number },
  shipName: { type: String },
  shipAddress: AddressSchema,
  details: [
    {
      productID: { type: String },
      unitPrice: { type: Number },
      quantity: { type: Number },
      discount: { type: Number },
      _id: false,
    },
  ],
  kind: { type: String, get: () => 'Order' },
});

OrderSchema.plugin(mongooseLeanId);
OrderSchema.plugin(mongooseLeanGetters);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
