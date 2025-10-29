import { Date, Types } from 'mongoose';

export type TUser = {
  _id?: Types.ObjectId;
  image?: string;
  
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  googleId?: string;
  avatar?: string;
};
