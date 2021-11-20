import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GiftDTO {
  @Expose()
  @ApiProperty()
  receiverId: string;

  @Expose()
  @ApiProperty()
  creatorId: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  giftCode: number;
}
