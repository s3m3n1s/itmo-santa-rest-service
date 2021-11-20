import * as mongoose from 'mongoose';

export const GiftSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    receiverId: { type: String, required: true },
    giftCode: { type: Number, required: true },
    status: { type: String },
  },
  { timestamps: true },
);
