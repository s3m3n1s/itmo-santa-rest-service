import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MAX_GIFTS_PER_REQUEST } from 'src/const/api';
import { ICommonGift } from 'src/items/interfaces/CommonGift';

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel('Gift') private readonly giftModel: Model<ICommonGift>,
  ) {}

  async createGift(gift: ICommonGift) {
    if (!gift.status) {
      gift.status = 'pending';
    }

    const lastGift = await this.giftModel
      .find()
      .limit(1)
      .sort({ $natural: -1 });

    let lastGiftCode = (lastGift as unknown as ICommonGift)[0]?.giftCode;

    if (!lastGiftCode) {
      lastGiftCode = 1000;
    }

    lastGiftCode = lastGiftCode + 1;

    const newGift = new this.giftModel({
      ...gift,
      giftCode: lastGiftCode,
    });

    return await newGift.save();
  }

  async getGifts(limit = MAX_GIFTS_PER_REQUEST, offset = 0) {
    const result = await this.giftModel
      .find()
      .select('status updatedAt giftCode -_id')
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

    return {
      users: result,
      count: await this.giftModel.countDocuments().exec(),
    };
  }

  async getGift(property: string, value: string) {
    if (property === 'id') {
      property = '_id';
    }

    const result = await this.giftModel
      .find({ [property]: value })
      .select('status updatedAt giftCode -_id');

    if (!result) {
      throw new NotFoundException({ message: 'Подарок не найден' });
    }

    return result;
  }

  async updateGift(id: string, update): Promise<ICommonGift> {
    const result = await this.giftModel.findOneAndUpdate(
      { creatorId: id },
      update,
      {
        lean: true,
        new: true,
      },
    );

    if (!result) {
      throw new NotFoundException({ message: 'Подарок не найден' });
    }

    return result;
  }

  async removeGift(id: string): Promise<ICommonGift> {
    const result = await this.giftModel.findOneAndDelete({ _id: id });

    if (!result) {
      throw new NotFoundException({ message: 'Подарок не найден' });
    }

    return result;
  }

  async updateGiftByCode(giftCode: number, status: string) {
    const result = await this.giftModel.findOneAndUpdate(
      { giftCode },
      { status },
      { lean: true, returnOriginal: false },
    );

    return result;
  }
}
