import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

enum notificationType {
  'GIFT_STATUS_CHANGED',
  'ALERT',
  'NEWS',
  'THANK_SANTA',
}
export class NotificationDTO {
  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false, enum: notificationType })
  type: string;
}
