import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

// DTOs
import { UpdateUserDto } from './dto/update-user.dto';

// Guards
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Services
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
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
