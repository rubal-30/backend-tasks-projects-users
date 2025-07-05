import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CacheModule } from '@nestjs/cache-manager';  
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [
    PrismaModule,  
    CacheModule.register({
      ttl: 600,  
      max: 100,  
    }),  
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
