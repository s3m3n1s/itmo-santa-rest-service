import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftSchema } from 'src/items/model/gift.model';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationService } from 'src/notifications/notifications.service';
import { GiftsController } from './gitfs.controller';
import { GiftsService } from './gitfs.service';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([{ name: 'Gift', schema: GiftSchema }]),
  ],
  controllers: [GiftsController],
  providers: [GiftsService, NotificationService],
})
export class GiftsModule {}
