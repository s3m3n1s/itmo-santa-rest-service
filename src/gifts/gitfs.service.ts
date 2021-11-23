import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import { MAX_GIFTS_PER_REQUEST } from 'src/const/api';
import { ICommonGift } from 'src/items/interfaces/CommonGift';

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel('Gift') private readonly giftModel: Model<ICommonGift>,
  ) {}

  async createGift(gift: ICommonGift) {
    const giftCode = new ShortUniqueId({
      length: 8,
      dictionary: 'number',
    }).dict.join('');

    if (!gift.status) {
      gift.status = 'pending';
    }

    const newGift = new this.giftModel({ ...gift, giftCode });
    const { id } = await newGift.save();
    return id;
  }

  async getGifts(limit = MAX_GIFTS_PER_REQUEST, offset = 0) {
    const result = await this.giftModel.find().skip(offset).limit(limit).exec();

    return {
      users: result,
      count: await this.giftModel.countDocuments().exec(),
    };
  }

  async getGift(property: string, value: string) {
    if (property === 'id') {
      property = '_id';
    }

    const result = await this.giftModel.find({ [property]: value });

    if (!result) {
      throw new NotFoundException({ message: 'Подарок не найден' });
    }

    return result;
  }

  async updateGift(id: string, update): Promise<ICommonGift> {
    const result = await this.giftModel.findByIdAndUpdate({ _id: id }, update, {
      lean: true,
      new: true,
    });

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
}
