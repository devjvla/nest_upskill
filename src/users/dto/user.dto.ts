import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  // @IsEnum(['backend', 'frontend'], {
  //   message: 'Invalid role.',
  // })
  // role: 'backend' | 'frontend';
}
