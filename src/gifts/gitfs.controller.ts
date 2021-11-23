import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GiftDTO } from 'src/items/dto/gift.request.dto';
import { ICommonGift } from 'src/items/interfaces/CommonGift';
import { GiftsService } from './gitfs.service';

@ApiTags('gifts')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gift' })
  @ApiForbiddenResponse({ description: 'Some params invalid' })
  @ApiCreatedResponse({
    description: 'gift was created',
  })
  async createGift(@Query() gift: GiftDTO): Promise<string> {
    return await this.giftsService.createGift(gift);
  }

  @Get('get/:property/:value')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get gift by property with value' })
  @ApiForbiddenResponse({ description: 'Incorrect input data' })
  @ApiFoundResponse({
    type: GiftDTO,
    description: 'Gift was found',
  })
  @ApiNotFoundResponse({ description: 'There is no such gift entity' })
  @ApiCreatedResponse({
    description: 'Gift information was received',
  })
  async getGift(
    @Param('property') property: string,
    @Param('value') value: string,
  ) {
    return await this.giftsService.getGift(property, value);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gift information' })
  @ApiForbiddenResponse({ description: 'Some params invalid' })
  @ApiNotFoundResponse({ description: 'There is no such gift entity' })
  @ApiCreatedResponse({
    description: 'Updates gift`s property',
  })
  async updateGift(
    @Param('id') id: string,
    @Query() data: GiftDTO,
  ): Promise<ICommonGift> {
    console.log(id);

    return await this.giftsService.updateGift(id, data);
  }

  @Delete('remove/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove gift' })
  @ApiForbiddenResponse({ description: 'Incorrect gift id' })
  @ApiNotFoundResponse({ description: 'There is no such gift entity' })
  @ApiCreatedResponse({
    description: 'Removes gift',
  })
  async removeGift(@Param('id') id: string): Promise<ICommonGift> {
    return await this.giftsService.removeGift(id);
  }
}
