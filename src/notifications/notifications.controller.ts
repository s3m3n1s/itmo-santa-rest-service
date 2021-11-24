import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
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
  @ApiUnprocessableEntityResponse({ description: 'Validation errors' })
  async sendNotification(
    @Query() notification: NotificationDTO,
  ): Promise<ICommonNotification> {
    return await this.notificationService.sendNotification(notification);
  }

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiFoundResponse({
    description: 'Notifications were found',
  })
  async getUsers(@Query() data: MultipleEntities) {
    return await this.notificationService.getNotifications(
      data.limit,
      data.offset,
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
