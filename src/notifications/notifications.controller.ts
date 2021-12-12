import { Controller, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
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
  @ApiUnprocessableEntityResponse({ description: 'Validation errors' })
  async sendNotification(
    @Query() notification: NotificationDTO,
  ): Promise<ICommonNotification | string> {
    return await this.notificationService.sendNotification(notification);
  }
}
