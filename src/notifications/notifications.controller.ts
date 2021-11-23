import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MAX_NOTIFICATIONS_PER_REQUEST } from 'src/const/api';
import { MultipleEntities } from 'src/items/dto/multipleEntities.request.dto';
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
  @ApiForbiddenResponse({ description: 'Some params are invalid' })
  async sendNotification(
    @Query() notification: NotificationDTO,
  ): Promise<ICommonNotification> {
    return await this.notificationService.sendNotification(notification);
  }

  @Get('get/:limit/:offset')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiFoundResponse({
    description: 'Notifications were found',
  })
  async getUsers(@Query() data: MultipleEntities) {
    if (!data.limit) {
      data.limit = MAX_NOTIFICATIONS_PER_REQUEST;
    }
    if (!data.offset) {
      data.offset = 0;
    }

    return await this.notificationService.getNotifications(
      Number(data.limit),
      Number(data.offset),
    );
  }

  @Get('getBy/:property/:value')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get notifications by property with value' })
  @ApiForbiddenResponse({ description: 'Incorrect input data' })
  @ApiFoundResponse({
    type: NotificationDTO,
    description: 'Notifications were found',
  })
  async getNotification(
    @Param('property') property: string,
    @Param('value') value: string,
  ) {
    return await this.notificationService.getNotification(property, value);
  }
}
