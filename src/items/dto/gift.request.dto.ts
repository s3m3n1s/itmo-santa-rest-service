import { ApiProperty } from '@nestjs/swagger';
import { giftStatus } from 'src/const/api';

export class GiftDTO {
  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  creatorId: string;

  @ApiProperty({ required: false })
  letter?: string;

  @ApiProperty({ default: giftStatus.PENDING, enum: giftStatus })
  status?: string;
}
