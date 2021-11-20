import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    isu: { type: Number, required: true },
    faculty: { type: String },
  },
  { timestamps: true },
);
