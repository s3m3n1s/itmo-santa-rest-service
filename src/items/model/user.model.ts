import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    isu: { type: Number, unique: true },
    faculty: { type: String, default: 'ИТМО' },
    role: { type: String, default: 'user' },
    bio: { type: String, default: '* No user information was provided *' },
    tgId: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);
