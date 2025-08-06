import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './entities/User';
import { Profile } from './entities/Profile';

/**
 * @description This module is responsible for setting up the database connection using TypeORM.
 * As of now, no other methods are inside this module. I went with this approach because
 * I am not a fan of having the TypeOrmModule.forRoot() method to be placed in AppModule.
 * If in the future we need to add more database-related methods, it will look organized
 * because all things related to database is in this module.
 * @author JV Abengona
 * @lastModified August 2, 2025
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Profile],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
