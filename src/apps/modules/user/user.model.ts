import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

// ## Create a User Schema Model corresponding to the document interface.

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    joinginDate: {
      type: String,
      required: true,
    },
    studentRoll: {
      type: String,
      required: true,
    },
    blodGroup: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    institute: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    ruler: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//## save before bcrypt the password //

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

// ## this is database Model/collection Name.
export const User = model<IUser, UserModel>('Users', userSchema);
