import axios from 'axios';
import { NotificationDTO } from 'src/items/dto/notification.request.dto';

export class NotificationService {
  async sendNotification(notification: NotificationDTO) {
    try {
      await axios.post(
        `${process.env.TELEGRAM_BOT_REST_URL}/notifications/${
          notification.event || 'send'
        }`,
        notification,
      );

      return notification;
    } catch (err) {
      console.log(err);
      return err.response?.data;
    }
  }
}
