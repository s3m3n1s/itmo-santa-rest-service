import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  @ApiProperty()
  username?: string;

  @Expose()
  @ApiProperty()
  isu?: number;

  @Expose()
  @ApiProperty()
  faculty?: string;
}
