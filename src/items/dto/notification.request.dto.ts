import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { notificationType } from 'src/const/api';

export class NotificationDTO {
  @IsString({ message: 'receiverId must be string' })
  @ApiProperty()
  receiverId: string;

  @IsString({ message: 'message must be string' })
  @ApiProperty()
  message: string;

  @IsString({ message: 'title must be string' })
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false, enum: notificationType })
  type: string;
}
