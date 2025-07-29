import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('role') role?: 'frontend' | 'backend') {
    return this.usersService.getUsers(role);
  }

  @Get(':user_id')
  getUserById(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.usersService.getUserById(user_id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':user_id')
  updateUserById(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return this.usersService.updateUserById({ ...user, user_id });
  }

  @Delete(':user_id')
  deleteByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.usersService.deleteUserById(user_id);
  }
}
