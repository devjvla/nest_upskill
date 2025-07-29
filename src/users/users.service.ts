import { Injectable } from '@nestjs/common';

type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'backend' | 'frontend';
};

@Injectable()
export class UsersService {
  // dummy data only. should use database later.
  private users_list: User[] = [
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

  getUsers(role?: string): User[] {
    let get_users_result = [...this.users_list];

    if (role) {
      get_users_result = get_users_result.filter((user) => {
        return user.role === role;
      });
    }

    return get_users_result;
  }

  getUserById(user_id: string): User {
    // check if user_id is a number
    try {
      const parsed_user_id = Number(user_id);

      if (isNaN(parsed_user_id)) {
        throw new Error('Invalid User ID.');
      }

      const user_index = this.users_list.findIndex(
        (user) => user.user_id === parsed_user_id,
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

  createUser(user: Omit<User, 'user_id'>): User {
    const { first_name, last_name, email, role } = user;
    const new_user: User = {
      user_id: this.users_list.length + 1,
      first_name,
      last_name,
      email,
      role,
    };

    this.users_list.push(new_user);

    return new_user;
  }

  updateUserById(
    user: Partial<Omit<User, 'user_id'>> & { user_id: string },
  ): User {
    // check if user_id is a number
    try {
      const { user_id, first_name, last_name, email, role } = user;
      const parsed_user_id = Number(user_id);

      if (isNaN(parsed_user_id)) {
        throw new Error('Invalid User ID.');
      }

      const user_index = this.users_list.findIndex(
        (user) => user.user_id === parsed_user_id,
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

  deleteUserById(user_id: string): User {
    // check if user_id is a number
    try {
      const parsed_user_id = Number(user_id);

      if (isNaN(parsed_user_id)) {
        throw new Error('Invalid User ID.');
      }

      const user_index = this.users_list.findIndex(
        (user) => user.user_id === parsed_user_id,
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
