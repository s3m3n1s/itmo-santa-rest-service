import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from 'src/items/dto/notification.request.dto';
import { CommonNotification } from 'src/items/model/notification.model';

export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<CommonNotification>,
  ) {}

  async sendNotification(notification: NotificationDTO) {
    const newNotification = new this.notificationModel(notification);
    const { id } = await newNotification.save();
    return id;
  }

  async getNotificationsByUserId(userId: string) {
    return this.notificationModel.find({ receiverId: userId });
  }
}
