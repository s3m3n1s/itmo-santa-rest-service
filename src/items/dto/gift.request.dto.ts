import { ApiProperty } from '@nestjs/swagger';
import { giftStatus } from 'src/const/api';

export class GiftDTO {
  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  creatorId: string;

  @ApiProperty({ required: false, enum: giftStatus })
  status: string;
}
