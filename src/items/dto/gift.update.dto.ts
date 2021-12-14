import { ApiProperty } from '@nestjs/swagger';
import { giftStatus } from 'src/const/api';

export class GiftUpdateDTO {
  @ApiProperty({ required: false })
  letter?: string;

  @ApiProperty({
    default: giftStatus.PENDING,
    enum: giftStatus,
    required: false,
  })
  status?: string;
}
