import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Profile } from 'src/database/entities/Profile';
import { User } from 'src/database/entities/User';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUserProfile(user: User): Promise<Profile> {
    try {
      const new_user_profile = this.profileRepository.create({
        user,
        status: 1,
      });

      return await this.profileRepository.save(new_user_profile);
    } catch (error) {
      return error.message;
    }
  }

  async getProfileByUserId(user_id: number): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({
        where: { user: { id: user_id } },
      });
    } catch (error) {
      return error.message;
    }
  }

  async deleteProfileById(id: number): Promise<Profile> {
    try {
      const get_profile = await this.profileRepository.findOne({
        where: { id },
      });

      if (!get_profile) {
        throw new Error('User profile not found.');
      }

      await this.profileRepository.delete(id);
    } catch (error) {
      return error.message;
    }
  }
}
