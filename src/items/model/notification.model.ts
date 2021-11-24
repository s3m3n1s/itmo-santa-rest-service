import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema(
  {
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    title: { type: String, required: false },
    type: { type: String, required: false },
  },
  { timestamps: true },
);
