import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  // dummy data only. should use database later.
  private users_list: UserDto[] = [
    {
      id: 1,
      email: 't.stark@gmail.com',
      password: 'ironman',
      first_name: 'Tony',
      last_name: 'Stark',
    },
    {
      id: 2,
      email: 's.rogers@gmail.com',
      password: 'captainamerica',
      first_name: 'Steve',
      last_name: 'Rogers',
    },
    {
      id: 3,
      email: 't.odinson@gmail.com',
      password: 'pointbreak',
      first_name: 'Thor',
      last_name: 'Odinson',
    },
    {
      id: 4,
      email: 'b.banner@gmail.com',
      password: 'hulk',
      first_name: 'Bruce',
      last_name: 'Banner',
    },
    {
      id: 5,
      email: 'n.romanoff@gmail.com',
      password: 'blackwidow',
      first_name: 'Natasha',
      last_name: 'Romanoff',
    },
    {
      id: 6,
      email: 'c.barton@gmail.com',
      password: 'hawkeye',
      first_name: 'Clint',
      last_name: 'Barton',
    },
  ];

  getUsers(): UserDto[] {
    // if (role) {
    //   get_users_result = get_users_result.filter((user) => {
    //     return user.role === role;
    //   });
    // }

    return this.users_list;
  }

  getUserById(id: number): UserDto {
    try {
      const user_index = this.users_list.findIndex((user) => user.id === id);

      // user_index will be -1 if user doesn't exist
      if (user_index < 0) {
        throw new Error('User not found.');
      }

      return this.users_list[user_index];
    } catch (error) {
      return error.message;
    }
  }

  async createUser(
    user_params: Omit<CreateUserDto, 'confirm_password'>,
  ): Promise<UserDto> {
    const new_user = this.userRepository.create({
      email: user_params.email,
      password: user_params.password,
      first_name: user_params.first_name,
      last_name: user_params.last_name,
    });

    return this.userRepository.save(new_user);
  }

  updateUserById(user: UpdateUserDto): UserDto {
    try {
      const { id, first_name, last_name, email } = user;

      const user_index = this.users_list.findIndex((user) => user.id === id);

      // user_index will be -1 if user doesn't exist
      if (user_index < 0) {
        throw new Error('User not found.');
      }

      // Update user details with condition that only update fields if passed value is not undefined
      this.users_list[user_index] = {
        ...this.users_list[user_index],
        first_name: first_name
          ? first_name
          : this.users_list[user_index].first_name,
        last_name: last_name
          ? last_name
          : this.users_list[user_index].last_name,
        email: email ? email : this.users_list[user_index].email,
      };

      return this.users_list[user_index];
    } catch (error) {
      return error.message;
    }
  }

  deleteUserById(id: number): UserDto {
    try {
      const user_index = this.users_list.findIndex((user) => user.id === id);

      // user_index will be -1 if user doesn't exist
      if (user_index < 0) {
        throw new Error('User not found.');
      }

      // Delete user
      return this.users_list.splice(user_index, 1)[0];
    } catch (error) {
      return error.message;
    }
  }
}
