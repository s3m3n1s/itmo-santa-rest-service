import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema(
  {
    receiverId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);
export interface CommonNotification extends mongoose.Document {
  receiverId: string;
  title: string;
  message: string;
  type: string;
}
