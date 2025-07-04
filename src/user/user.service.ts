import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserTasks(id: number) {
    return this.prisma.task.findMany({
      where: { userId: id },
    });
  }

  async findUserProjects(id: number) {
    return this.prisma.project.findMany({
      where: { userId: id },
    });
  }

  async findUserComments(id: number) {
    return this.prisma.comment.findMany({
      where: { userId: id },
    });
  }
}
