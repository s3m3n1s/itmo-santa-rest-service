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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get('get/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user' })
  @ApiFoundResponse({
    type: UserDTO,
    description: 'User was found',
  })
  @ApiForbiddenResponse({ description: 'Incorrect user id' })
  async getUsers(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'User was updated',
  })
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
  @ApiForbiddenResponse({ description: 'Incorrect user id' })
  @ApiOkResponse({
    description: 'User was deleted succesfully',
  })
  async removeUser(@Param('id') id: string): Promise<ICommonUser> {
    return await this.usersService.removeUser(id);
  }
}
