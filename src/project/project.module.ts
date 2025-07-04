import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CacheModule } from '@nestjs/cache-manager';  // Import CacheModule
import { PrismaModule } from '../prisma/prisma.module'; // Import Prisma module (if you're using Prisma for DB)

@Module({
  imports: [
    PrismaModule,  // Make sure Prisma is imported
    CacheModule.register({
      ttl: 600,  // Time to live for cache in seconds
      max: 100,  // Maximum items stored in cache
    }),  // Register the CacheModule with your desired options
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
