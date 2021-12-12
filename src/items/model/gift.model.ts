import * as mongoose from 'mongoose';

export const GiftSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    receiverId: { type: String, required: true },
    giftCode: { type: Number, required: true, unique: true, default: 1000 },
    letter: {
      type: String,
      required: false,
      default: '* No letter was attached *',
    },
    status: { type: String },
  },
  { timestamps: true },
);
