import { Injectable } from '@nestjs/common';

// DTOs
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // dummy data only. should use database later.
  private users_list: UserDto[] = [
    {
      user_id: 1,
      first_name: 'Tony',
      last_name: 'Stark',
      email: 't.stark@gmail.com',
      role: 'backend',
    },
    {
      user_id: 2,
      first_name: 'Steve',
      last_name: 'Rogers',
      email: 's.rogers@gmail.com',
      role: 'frontend',
    },
    {
      user_id: 3,
      first_name: 'Thor',
      last_name: 'Odinson',
      email: 't.odinson@gmail.com',
      role: 'frontend',
    },
    {
      user_id: 4,
      first_name: 'Bruce',
      last_name: 'Banner',
      email: 'b.banner@gmail.com',
      role: 'backend',
    },
    {
      user_id: 5,
      first_name: 'Natasha',
      last_name: 'Romanoff',
      email: 'n.romanoff@gmail.com',
      role: 'frontend',
    },
    {
      user_id: 6,
      first_name: 'Clint',
      last_name: 'Barton',
      email: 'c.barton@gmail.com',
      role: 'backend',
    },
  ];

  getUsers(role?: string): UserDto[] {
    let get_users_result = [...this.users_list];

    if (role) {
      get_users_result = get_users_result.filter((user) => {
        return user.role === role;
      });
    }

    return get_users_result;
  }

  getUserById(user_id: number): UserDto {
    try {
      const user_index = this.users_list.findIndex(
        (user) => user.user_id === user_id,
      );

      // user_index will be -1 if user doesn't exist
      if (user_index < 0) {
        throw new Error('User not found.');
      }

      return this.users_list[user_index];
    } catch (error) {
      return error.message;
    }
  }

  createUser(user: CreateUserDto): UserDto {
    const { first_name, last_name, email, role } = user;
    const new_user: UserDto = {
      user_id: this.users_list.length + 1,
      first_name,
      last_name,
      email,
      role,
    };

    this.users_list.push(new_user);

    return new_user;
  }

  updateUserById(user: UpdateUserDto): UserDto {
    try {
      const { user_id, first_name, last_name, email, role } = user;

      const user_index = this.users_list.findIndex(
        (user) => user.user_id === user_id,
      );

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
        role: role ? role : this.users_list[user_index].role,
      };

      return this.users_list[user_index];
    } catch (error) {
      return error.message;
    }
  }

  deleteUserById(user_id: number): UserDto {
    try {
      const user_index = this.users_list.findIndex(
        (user) => user.user_id === user_id,
      );

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
