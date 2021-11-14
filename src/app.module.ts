import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GiftsController } from './gifts/gitfs.controller';
import { NotificationsController } from './notifications/notifications.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    GiftsController,
    NotificationsController,
  ],
  providers: [AppService],
})
export class AppModule {}
