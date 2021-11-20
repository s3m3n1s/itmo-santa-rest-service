import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/items/dto/user.request.dto';
import { ICommonUser } from 'src/items/interfaces/CommonUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<ICommonUser>,
  ) {}

  async createUser(user: UserDTO) {
    if (this.isUsernameWasTaken(user.username)) {
      throw new ConflictException({
        description: 'Имя пользователя уже занято',
      });
    }
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async getUserById(id: string) {
    return this.userModel.find({ _id: id });
  }

  async getUserByUsername(username: string) {
    return this.userModel.find({ username });
  }

  async isUsernameWasTaken(username: string) {
    const user = await this.getUserByUsername(username);
    return !Boolean(user.length);
  }

  async updateUser(id: string, update): Promise<ICommonUser> {
    return await this.userModel.findByIdAndUpdate({ _id: id }, update, {
      lean: true,
    });
  }

  async removeUser(id: string): Promise<ICommonUser> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
