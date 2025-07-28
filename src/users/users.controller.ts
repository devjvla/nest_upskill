import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('role') role?: 'frontend' | 'backend') {
    return this.usersService.getUsers(role);
  }

  @Get(':user_id')
  getUserById(@Param('user_id') user_id: string) {
    return this.usersService.getUserById(user_id);
  }

  @Post()
  createUser(@Body() user: { first_name: string; last_name: string; email: string }) {
    return this.usersService.createUser(user);
  }

  @Patch(':user_id')
  updateUserById(
    @Param('user_id') user_id: string,
    @Body() user: { first_name: string; last_name: string; email: string },
  ) {
    return this.usersService.updateUserById({ ...user, user_id });
  }

  @Delete(':user_id')
  deleteByUserId(@Param('user_id') user_id: string) {
    return this.usersService.deleteUserById(user_id);
  }
}
