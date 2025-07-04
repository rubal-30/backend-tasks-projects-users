import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    ProjectModule,
    CommentModule,
    CacheModule.register({
      store: 'ioredis',
      host: 'localhost', 
      port: 6379, 
      ttl: 3600, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
