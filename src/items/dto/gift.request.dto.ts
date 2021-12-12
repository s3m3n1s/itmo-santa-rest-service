import { ApiProperty } from '@nestjs/swagger';
import { giftStatus } from 'src/const/api';

export class GiftDTO {
  @ApiProperty({ required: false })
  receiverId?: string;

  @ApiProperty({ required: false })
  creatorId?: string;

  @ApiProperty({ required: false })
  letter?: string;

  @ApiProperty({ required: false, enum: giftStatus })
  status: string;
}
