import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from 'src/database/entities/User';

// Modules
import { ProfilesModule } from 'src/profiles/profiles.module';

// Controllers
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
