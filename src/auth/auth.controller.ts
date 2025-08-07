import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';

// DTOs
import { UserSignUpDto } from 'src/users/dto/user-signup.dto';

// Services
import { AuthService } from './auth.service';
import { UserSignInDto } from 'src/users/dto/user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...user_params } = userSignUpDto;

    const user_signup = await this.authService.signUp(user_params);

    if (!user_signup.user_id) {
      throw new HttpException(
        user_signup as unknown as string,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user_signup;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body(ValidationPipe) userSignInDto: UserSignInDto) {
    const user_signin = await this.authService.signIn(userSignInDto);

    if (!user_signin.user_id) {
      throw new HttpException(
        user_signin as unknown as string,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user_signin;
  }
}
