import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
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
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':user_id')
  async getUserById(@Param('user_id', ParseIntPipe) user_id: number) {
    return await this.usersService.getUserById(user_id);
  }

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...user_params } = createUserDto;
    const create_user = this.usersService.createUser(user_params);

    return await create_user;
  }

  @Patch(':user_id')
  async updateUserById(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return await this.usersService.updateUserById({ ...user, id: user_id });
  }

  @Delete(':user_id')
  async deleteByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    return await this.usersService.deleteUserById(user_id);
  }
}
