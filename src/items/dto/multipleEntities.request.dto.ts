import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MultipleEntities {
  @IsOptional()
  @ApiPropertyOptional()
  limit: number;

  @IsOptional()
  @ApiPropertyOptional()
  offset: number;
}
