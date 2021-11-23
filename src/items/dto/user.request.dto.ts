import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

enum userFaculty {
  'МФ КТИУ',
  'МФ ТИНТ',
  'ФТМФ',
  'МФ НЖ',
  'МФ БТИНС',
  'ФТМИИ',
}

export class UserDTO {
  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty({ required: false })
  isu: number;

  @Expose()
  @ApiProperty({ required: false, enum: userFaculty })
  faculty: string;
}
