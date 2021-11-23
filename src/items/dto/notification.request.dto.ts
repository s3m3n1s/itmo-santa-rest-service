import { ApiProperty } from '@nestjs/swagger';
import { notificationType } from 'src/const/api';

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
