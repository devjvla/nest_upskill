import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Profile } from 'src/database/entities/Profile';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUserProfile(user_id: number): Promise<Profile> {
    try {
      const new_user_profile = this.profileRepository.create({
        user: { id: user_id },
        status: 1,
      });

      return await this.profileRepository.save(new_user_profile);
    } catch (error) {
      return error.message;
    }
  }
}
