import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });

import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProfilesModule } from './profiles/profiles.module';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, ProfilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
