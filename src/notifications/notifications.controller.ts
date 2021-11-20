import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationDTO } from 'src/items/dto/notification.request.dto';
import { ICommonNotification } from 'src/items/interfaces/CommonNotification';
import { NotificationService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send notification' })
  @ApiForbiddenResponse({ description: 'Some params invalid' })
  async sendNotification(
    @Query() notification: NotificationDTO,
  ): Promise<ICommonNotification> {
    return await this.notificationService.sendNotification(notification);
  }

  @Get('get/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get notifications for user' })
  @ApiForbiddenResponse({ description: 'User id is invalid' })
  async getNotifications(
    @Param('userId') userId: string,
  ): Promise<ICommonNotification[]> {
    const notifications =
      await this.notificationService.getNotificationsByUserId(userId);
    return notifications;
  }
}
