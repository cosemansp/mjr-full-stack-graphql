/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import mongooseLeanGetters from 'mongoose-lean-getters';
import { AddressSchema, IAddress } from './order';

export interface ICustomer extends Document {
  _id: string;
  customerID: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: IAddress;
}

const CustomerSchema: Schema = new Schema({
  customerID: { type: String },
  companyName: { type: String },
  contactName: { type: String },
  contactTitle: { type: String },
  address: AddressSchema,
  kind: { type: String, get: () => 'Customer' },
});

CustomerSchema.plugin(mongooseLeanId);
CustomerSchema.plugin(mongooseLeanGetters);

export const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);
