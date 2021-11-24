import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MAX_NOTIFICATIONS_PER_REQUEST } from 'src/const/api';
import { NotificationDTO } from 'src/items/dto/notification.request.dto';
import { ICommonNotification } from 'src/items/interfaces/CommonNotification';

export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<ICommonNotification>,
  ) {}

  async sendNotification(notification: NotificationDTO) {
    const newNotification = new this.notificationModel(notification);
    const { id } = await newNotification.save();
    return id;
  }

  async getNotifications(limit = MAX_NOTIFICATIONS_PER_REQUEST, offset = 0) {
    const result = await this.notificationModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

    return {
      users: result,
      count: await this.notificationModel.countDocuments().exec(),
    };
  }

  async getNotification(property: string, value: string) {
    if (property === 'id') {
      property = '_id';
    }

    const result = await this.notificationModel.find({ [property]: value });

    return result;
  }
}
