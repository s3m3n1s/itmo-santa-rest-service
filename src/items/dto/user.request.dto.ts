import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { userFaculty, userRoles } from 'src/const/api';

export class UserDTO {
  @Expose()
  @ApiProperty({ required: false })
  username: string;

  @Expose()
  @ApiProperty({ required: false })
  isu: number;

  @Expose()
  @ApiProperty({ required: false, enum: userFaculty })
  faculty: string;

  @Expose()
  @ApiProperty({ required: false, enum: userRoles })
  role: string;

  @Expose()
  @ApiProperty({ required: false })
  bio: string;

  @Expose()
  @ApiProperty({ required: false })
  tgId: string;
}
