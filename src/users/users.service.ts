import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Helpers
import { decryptText, encryptText } from 'src/utils/helpers/auth.helper';

// DTOs
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entities
import { User } from 'src/database/entities/User';

// Services
import { ProfilesService } from 'src/profiles/profiles.service';
import { UserProfileType } from './user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
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
    user_params: Omit<UserSignUpDto, 'confirm_password'>,
  ): Promise<User> {
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

  /**
   * @description This function will handle creation of User and Profile record.
   * @author JV Abengona
   * @lastModified August 8, 2025
   */
  async userSignUp(
    user_signup_params: Omit<UserSignUpDto, 'confirm_password'>,
  ): Promise<UserProfileType> {
    try {
      const create_user = await this.createUser(user_signup_params);

      if (!create_user.id) {
        throw new Error(create_user as unknown as string);
      }

      // eslint-disable-next-line prettier/prettier
      const create_user_profile = await this.profilesService.createUserProfile(create_user);

      if (!create_user_profile.id) {
        throw new Error(create_user_profile as unknown as string);
      }

      return {
        user_id: create_user.id,
        email: create_user.email,
        first_name: create_user.first_name,
        last_name: create_user.last_name,
        user_profile_id: create_user_profile.id,
      };
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @description This function will handle fetching of User record by email and decrypting of password
   * from database to validate user credentials.
   * @author JV Abengona
   * @lastModified August 8, 2025
   */
  async userSignIn(
    user_signin_params: UserSignInDto,
  ): Promise<UserProfileType> {
    try {
      const { email, password } = user_signin_params;

      const get_user = await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.profile', 'profiles')
        .where('users.email = :email', { email })
        .getOne();

      if (!get_user.id) {
        throw new Error('User not found.');
      }

      // Check if password matches encrypted password in database
      const decrypted_password = await decryptText(get_user.password);

      if (decrypted_password !== password) {
        throw new Error('Invalid email or password.');
      }

      return {
        user_id: get_user.id,
        email: get_user.email,
        first_name: get_user.first_name,
        last_name: get_user.last_name,
        user_profile_id: get_user.profile[0].id,
      };
    } catch (error) {
      return error.message;
    }
  }
}
