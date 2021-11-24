import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import { MAX_USERS_PER_REQUEST } from 'src/const/api';
import { UserDTO } from 'src/items/dto/user.request.dto';
import { ICommonUser } from 'src/items/interfaces/CommonUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<ICommonUser>,
  ) {}

  async createUser(user: UserDTO) {
    if (await this.isUsernameWasTaken(user.username)) {
      throw new ConflictException({
        description: 'Имя пользователя уже занято',
      });
    }

    const token = new ShortUniqueId({
      length: 10,
    })();
    const newUser = new this.userModel({ ...user, token });
    return await newUser.save();
  }

  async getUsers(limit = MAX_USERS_PER_REQUEST, offset = 0) {
    const result = await this.userModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

    return {
      users: result,
      count: await this.userModel.countDocuments().exec(),
    };
  }

  async getUser(property: string, value: string) {
    if (property === 'id') {
      property = '_id';
    }

    const result = await this.userModel.find({ [property]: value });

    if (!result) {
      throw new NotFoundException({ message: 'Пользователь не найден' });
    }

    return result;
  }

  async getUserById(token: string) {
    const result = await this.userModel.find({ token });

    if (!result.length) {
      throw new NotFoundException({ message: 'Данный пользователь не найден' });
    }

    return result;
  }

  async getUserByUsername(username: string) {
    return this.userModel.find({ username });
  }

  async isUsernameWasTaken(username: string) {
    const user = await this.getUserByUsername(username);
    return Boolean(user.length);
  }

  async updateUser(id: string, update): Promise<ICommonUser> {
    const result = await this.userModel.findByIdAndUpdate({ _id: id }, update, {
      lean: true,
    });

    if (!result) {
      throw new NotFoundException({ message: 'Данный пользователь не найден' });
    }

    return result;
  }

  async removeUser(id: string): Promise<ICommonUser> {
    let result: ICommonUser;
    try {
      result = await this.userModel.findOneAndDelete({ _id: id });
    } catch (err) {
      console.log(err);
      throw new ConflictException({
        description: 'Ошибка базы данных. Скорее всего id задан неверно.',
      });
    }

    if (!result) {
      throw new NotFoundException({ message: 'Данный пользователь не найден' });
    }

    return result;
  }
}
