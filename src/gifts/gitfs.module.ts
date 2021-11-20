import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftSchema } from 'src/items/model/gift.model';
import { GiftsController } from './gitfs.controller';
import { GiftsService } from './gitfs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Gift', schema: GiftSchema }])],
  controllers: [GiftsController],
  providers: [GiftsService],
})
export class GiftsModule {}
