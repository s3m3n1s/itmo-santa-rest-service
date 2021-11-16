import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  facultyId: { type: Number },
  fractionId: { type: Number },
});

export interface User extends mongoose.Document {
  username: string;
  facultyId: number;
  fractionId: number;
}
