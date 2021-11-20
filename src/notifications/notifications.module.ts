import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from 'src/items/model/notification.model';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationService],
})
export class NotificationsModule {}
