import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    isu: { type: Number, required: false, unique: true },
    faculty: { type: String },
  },
  { timestamps: true },
);
