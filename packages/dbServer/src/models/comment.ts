/* eslint-disable @typescript-eslint/camelcase */
import mongoose, { Schema, Document, Types } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

export interface IComment extends Document {
  _id: string;
  name: string;
  email: string;
  text: string;
  date: Date;
  movie_id: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String },
  text: { type: String },
  date: { type: Date },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
});

CommentSchema.plugin(mongooseLeanId);

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);
