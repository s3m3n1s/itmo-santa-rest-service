import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

enum giftStatus {
  'pending',
  'delivered',
  'received',
}

export class GiftDTO {
  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  creatorId: string;

  @ApiProperty({ required: false, enum: giftStatus })
  status: string;
}
