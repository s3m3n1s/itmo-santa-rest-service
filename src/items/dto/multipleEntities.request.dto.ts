import { ApiProperty } from '@nestjs/swagger';

export class MultipleEntities {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
