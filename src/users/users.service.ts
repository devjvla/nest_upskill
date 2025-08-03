import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Helpers
import { encryptText } from 'src/utils/helpers/auth.helper';

// DTOs
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entities
import { User } from 'src/database/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const get_users = await this.userRepository.find({
        select: ['id', 'first_name', 'last_name', 'email'],
      });

      return get_users;
    } catch (error) {
      return error.message;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const get_user = await this.userRepository.findOne({ where: { id } });

      // get_user will be null if no record from database is fetched.
      if (!get_user) {
        throw new Error('User not found.');
      }

      return get_user;
    } catch (error) {
      return error.message;
    }
  }

  async createUser(
    user_params: Omit<CreateUserDto, 'confirm_password'>,
  ): Promise<UserDto> {
    try {
      const new_user = this.userRepository.create({
        email: user_params.email,
        password: await encryptText(user_params.password),
        first_name: user_params.first_name,
        last_name: user_params.last_name,
      });

      return await this.userRepository.save(new_user);
    } catch (error) {
      return error.message;
    }
  }

  async updateUserById(user: UpdateUserDto): Promise<User> {
    try {
      const { id, ...user_params } = user;

      const get_user = await this.userRepository.findOne({ where: { id } });

      // get_user will be null if no record from database is fetched.
      if (!get_user) {
        throw new Error('User not found.');
      }

      // Update user details with condition that only update fields if passed value is not undefined
      const updated_at = new Date();
      await this.userRepository.update(id, {
        ...user_params,
        updated_at,
      });

      return { ...get_user, ...user_params, updated_at };
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserById(id: number): Promise<User> {
    try {
      const get_user = await this.userRepository.findOne({ where: { id } });

      // get_user will be null if no record from database is fetched.
      if (!get_user) {
        throw new Error('User not found.');
      }

      // Delete user
      await this.userRepository.delete(id);

      return get_user;
    } catch (error) {
      return error.message;
    }
  }
}
