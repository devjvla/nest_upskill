import { Injectable } from '@nestjs/common';

// DTOs
import { UserSignInDto } from 'src/users/dto/user-signin.dto';
import { UserSignUpDto } from 'src/users/dto/user-signup.dto';

// Types
import { UserProfileType } from 'src/users/user.types';

// Modules
import { JwtService } from '@nestjs/jwt';

// Services
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description This function will create User and Profile record handled by Users Module,
   * then generate a JWT with user's details then return in to the client.
   * @author JV Abengona
   * @lastModified August 7, 2025
   */
  async signUp(
    user_signup_params: Omit<UserSignUpDto, 'confirm_password'>,
  ): Promise<UserProfileType> {
    try {
      // eslint-disable-next-line prettier/prettier
      const user_signup = await this.usersService.userSignUp(user_signup_params);

      if (!user_signup.user_id) {
        throw new Error(user_signup as unknown as string);
      }

      // Generate JWT

      return user_signup;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @description This function will create User and Profile record handled by Users Module,
   * then generate a JWT with user's details then return in to the client.
   * @author JV Abengona
   * @lastModified August 7, 2025
   */
  async signIn(user_signin_params: UserSignInDto): Promise<UserProfileType> {
    try {
      // eslint-disable-next-line prettier/prettier
      const user_signin = await this.usersService.userSignIn(user_signin_params);

      if (!user_signin.user_id) {
        throw new Error(user_signin as unknown as string);
      }

      // Generate JWT

      return user_signin;
    } catch (error) {
      return error.message;
    }
  }
}
