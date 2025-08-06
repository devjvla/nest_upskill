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
import { UserSignUpDto } from './dto/user-signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { UsersService } from './users.service';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('signup')
  async userSignUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...user_params } = userSignUpDto;

    const user_signup = await this.usersService.userSignUp(user_params);

    if (!user_signup.user_id) {
      throw new HttpException(
        user_signup as unknown as string,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user_signup;
  }

  @Post('signin')
  async userSignIn(@Body(ValidationPipe) userSignIn: UserSignInDto) {
    return await this.usersService.userSignIn(userSignIn);
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
