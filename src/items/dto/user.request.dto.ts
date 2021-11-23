import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { userFaculty } from 'src/const/api';

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
