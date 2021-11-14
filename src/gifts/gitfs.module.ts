import { Module } from '@nestjs/common';
import { GiftsController } from './gitfs.controller';

@Module({
  controllers: [GiftsController],
})
export class GiftsModule {}
