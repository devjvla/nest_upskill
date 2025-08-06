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
  HttpException,
  HttpStatus,
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

  @Post('signup')
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...user_params } = createUserDto;

    const user_signup = await this.usersService.userSignUp(user_params);

    if (!user_signup.user_id) {
      throw new HttpException(
        user_signup as unknown as string,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user_signup;
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
