import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  @ApiCreatedResponse({
    description: 'Send a notification to the provided user',
  })
  @Post('notify')
  notifyUser() {}
}
