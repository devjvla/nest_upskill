import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/utils/decorators/match.decorator';

// DTOs
import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @IsNotEmpty()
  @Match('password', { message: "Passwords doesn't match!" })
  confirm_password: string;
}
