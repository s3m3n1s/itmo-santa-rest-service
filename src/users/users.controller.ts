import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  async createUser(
    @Body('username') username: string,
    @Body('facultyId') facultyId: number,
    @Body('fractionId') fractionId: number,
  ) {
    const id = await this.usersService.createUser({
      username,
      facultyId,
      fractionId,
    });

    return { id };
  }
  @Get('get')
  getUsers() {}
  @Patch('update')
  updateUser() {}
  @Delete('remove')
  removeUser() {}
}
