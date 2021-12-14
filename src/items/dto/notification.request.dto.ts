import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { botEvents, notificationType } from 'src/const/api';

export class NotificationDTO {
  @ApiProperty({ default: process.env.DEV_TG_ID })
  receiverId: string;

  @ApiProperty({ required: false })
  message: string;

  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({
    required: false,
    enum: botEvents,
    default: botEvents.REGISTRATION,
  })
  event: string;

  @ApiProperty({ required: false, enum: notificationType })
  type: string;
}
