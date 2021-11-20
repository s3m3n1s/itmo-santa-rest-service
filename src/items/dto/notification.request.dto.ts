import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationDTO {
  @Expose()
  @ApiProperty()
  receiverId: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  type: string;
}
