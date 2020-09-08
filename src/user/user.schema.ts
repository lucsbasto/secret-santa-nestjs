import { Schema, model, Types, Document } from 'mongoose';

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  friend?: string;
}

export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must to be unique'],
    },
    friend: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

schema.statics.isValid = id => {
  return Types.ObjectId.isValid(id);
};

export interface UserModel extends Omit<User, '_id'>, Document {}
