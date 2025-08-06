import { IsNotEmpty } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
