import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
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
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
