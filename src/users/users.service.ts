import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(role?: string): string {
    let return_msg = 'getUsers is called.';

    if (role) {
      return_msg = 'getUsers is called with role: ' + role;
    }

    return return_msg;
  }

  getUserById(user_id: string): string {
    let return_msg = `getUserById is called with user_id: ${user_id}`;

    // check if user_id is a number
    try {
      if (isNaN(Number(user_id))) {
        throw new Error('user_id must be a number.');
      }
    } catch (error) {
      return_msg = error.message;
    }

    return return_msg;
  }

  createUser(user: { first_name: string; last_name: string; email: string}): string {
    const { first_name, last_name, email } = user;

    return `createUser is called. First Name: ${first_name}, Last Name: ${last_name}, Email: ${email}`;
  }

  updateUserById(user: { user_id: string; first_name: string; last_name: string; email: string}): string {
    const { user_id, first_name, last_name, email } = user;
    let return_msg = `updateUserById is called. User ID: ${user_id}, First Name: ${first_name}, Last Name: ${last_name}, Email: ${email}`;

    // check if user_id is a number
    try {
      if (isNaN(Number(user_id))) {
        throw new Error('user_id must be a number.');
      }
    } catch (error) {
      return_msg = error.message;
    }

    return return_msg;
  }

  deleteUserById(user_id: string): string {
    let return_msg = `deleteUserById is called with user_id: ${user_id}`;

    // check if user_id is a number
    try {
      if (isNaN(Number(user_id))) {
        throw new Error('user_id must be a number.');
      }
    } catch (error) {
      return_msg = error.message;
    }

    return return_msg;
  }
}
