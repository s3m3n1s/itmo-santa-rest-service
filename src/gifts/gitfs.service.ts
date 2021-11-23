import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
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

  async getGift(property: string, value: string) {
    if (property === 'id') {
      property = '_id';
    }

    return this.giftModel.find({ [property]: value });
  }

  async updateGift(id: string, update): Promise<ICommonGift> {
    return await this.giftModel.findByIdAndUpdate({ _id: id }, update, {
      lean: true,
      new: true,
    });
  }

  async removeGift(id: string): Promise<ICommonGift> {
    return await this.giftModel.findOneAndDelete({ _id: id });
  }
}
