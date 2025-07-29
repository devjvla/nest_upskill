import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsEnum(['backend', 'frontend'], {
    message: 'Invalid role.',
  })
  role: 'backend' | 'frontend';
}
