import {
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
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MAX_USERS_PER_REQUEST } from 'src/const/api';
import { MultipleEntities } from 'src/items/dto/multipleEntities.request.dto';
import { UserDTO } from 'src/items/dto/user.request.dto';
import { ICommonUser } from 'src/items/interfaces/CommonUser';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    description: 'User was created succesfully',
  })
  @ApiForbiddenResponse({ description: 'Incorrect params' })
  async createUser(@Query() user: UserDTO) {
    const id = await this.usersService.createUser(user);
    return id;
  }

  @Get('get/:limit/:offset')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiFoundResponse({
    description: 'Users was found',
  })
  async getUsers(@Query() data: MultipleEntities) {
    if (!data.limit) {
      data.limit = MAX_USERS_PER_REQUEST;
    }
    if (!data.offset) {
      data.offset = 0;
    }

    return await this.usersService.getUsers(
      Number(data.limit),
      Number(data.offset),
    );
  }

  @Get('getBy/:property/:value')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by property with value' })
  @ApiForbiddenResponse({ description: 'Incorrect input data' })
  @ApiFoundResponse({
    type: UserDTO,
    description: 'Users was found',
  })
  @ApiNotFoundResponse({ description: 'There is no such user entity' })
  async getUser(
    @Param('property') property: string,
    @Param('value') value: string,
  ) {
    return await this.usersService.getUser(property, value);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'User was updated',
  })
  @ApiNotFoundResponse({ description: 'There is no such user entity' })
  @ApiForbiddenResponse({ description: 'Incorrect user id' })
  async updateUser(
    @Param('id') id: string,
    @Query() data: UserDTO,
  ): Promise<ICommonUser> {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('remove/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove user' })
  @ApiNotFoundResponse({ description: 'There is no such user entity' })
  @ApiForbiddenResponse({ description: 'Incorrect user id' })
  @ApiOkResponse({
    description: 'User was deleted succesfully',
  })
  async removeUser(@Param('id') id: string): Promise<ICommonUser> {
    return await this.usersService.removeUser(id);
  }
}
