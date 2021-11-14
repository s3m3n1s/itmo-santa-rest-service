import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('gifts')
@Controller('gifts')
export class GiftsController {
  @ApiCreatedResponse({
    description: 'Creates gift object',
  })
  @Post('create')
  createGift() {}

  @ApiCreatedResponse({
    description: 'Gets gifts by provided query',
  })
  @Get('get')
  getGifts() {}

  @ApiCreatedResponse({
    description: 'Updates gift`s property',
  })
  @Patch('update')
  updateGift() {}

  @ApiCreatedResponse({
    description: 'Removes gift',
  })
  @Delete('remove')
  removeGift() {}
}
