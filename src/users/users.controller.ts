import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Post('create')
  createUser() {}
  @Get('get')
  getUsers() {}
  @Patch('update')
  updateUser() {}
  @Delete('remove')
  removeUser() {}
}
