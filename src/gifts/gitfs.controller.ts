import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { TelegramElfGuard } from 'src/common/TelegramElfGuard';
import { GiftDTO } from 'src/items/dto/gift.request.dto';
import { MultipleEntities } from 'src/items/dto/multipleEntities.request.dto';
import { ICommonGift } from 'src/items/interfaces/CommonGift';
import { NotificationService } from 'src/notifications/notifications.service';
import { GiftsService } from './gitfs.service';

@ApiTags('gifts')
@Controller('gifts')
// @UseGuards(TelegramElfGuard)
export class GiftsController {
  constructor(
    private readonly giftsService: GiftsService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gift' })
  @ApiForbiddenResponse({ description: 'Some params invalid' })
  @ApiCreatedResponse({
    description: 'gift was created',
  })
  async createGift(@Query() gift: GiftDTO): Promise<ICommonGift> {
    const res = await this.giftsService.createGift(gift);
    const notification = {
      receiverId: gift.creatorId,
      message: 'Можно идти за подарком',
      title: 'Получатель подарка определён!',
      type: 'GIFT_STATUS_CHANGED',
    };
    //await this.notificationService.sendNotification(notification);
    return res;
  }

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all gifts' })
  @ApiFoundResponse({
    description: 'Gifts were found',
  })
  async getGifts(@Query() data: MultipleEntities) {
    return await this.giftsService.getGifts(data.limit, data.offset);
  }

  @Get('getBy/:property/:value')
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

  @UseGuards(TelegramElfGuard)
  @Patch('updateByCode/:giftCode/:status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gift status' })
  async updateGiftByCode(
    @Param('giftCode') giftCode: number,
    @Param('status') status: string,
  ) {
    return await this.giftsService.updateGiftByCode(giftCode, status);
  }
}
