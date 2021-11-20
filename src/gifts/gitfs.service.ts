import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICommonGift } from 'src/items/interfaces/CommonGift';

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel('Gift') private readonly giftModel: Model<ICommonGift>,
  ) {}
  async createGift(gift: ICommonGift) {
    const newGift = new this.giftModel(gift);
    const { id } = await newGift.save();
    return id;
  }

  async getGift(id: string) {
    return this.giftModel.find({ _id: id });
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
