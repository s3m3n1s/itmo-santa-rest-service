import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { botEvents, notificationType } from 'src/const/api';

export class NotificationDTO {
  @IsString({ message: 'receiverId must be string' })
  @ApiProperty({ default: process.env.DEV_TG_ID })
  receiverId: string;

  @IsString({ message: 'message must be string' })
  @ApiProperty({ required: false })
  message: string;

  @IsString({ message: 'title must be string' })
  @ApiProperty({ required: false })
  title: string;

  @IsString({ message: 'endpoint must be string' })
  @ApiProperty({
    required: false,
    enum: botEvents,
    default: botEvents.REGISTRATION,
  })
  event: string;

  @ApiProperty({ required: false, enum: notificationType })
  type: string;
}
