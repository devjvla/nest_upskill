import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });

import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [UsersModule, DatabaseModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
