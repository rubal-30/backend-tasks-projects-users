import { Injectable, NotFoundException ,Inject} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER  } from '@nestjs/cache-manager'; 
import { Cache } from 'cache-manager';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache 
  ) {}
 
  create(dto: CreateTaskDto, userId: number) {
    const data: any = {
      title: dto.title,
      description: dto.description,
      status: dto.status ?? 'pending',
      userId,
    };

    if (dto.projectId !== undefined) {
      data.projectId = dto.projectId;
    }

    return this.prisma.task.create({ data });
  }

  async findAllByUser(userId: number, opts: any) {
    const { page = 1, limit = 10, status, title } = opts;
    const skip = (page - 1) * limit;

    const filters: any = { userId };

    if (status) filters.status = status;
    if (title) filters.title = { contains: title, mode: 'insensitive' };

    const cacheKey = `tasks:${userId}:${page}:${limit}:${status}:${title}`;
    
    
    const cachedTasks = await this.cacheManager.get(cacheKey);
    if (cachedTasks) {
      return cachedTasks; 
    }

    const tasks = await this.prisma.task.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: { id: 'asc' },
    });

    
    await this.cacheManager.set(cacheKey, tasks, 600);

    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }

  getTaskComments(taskId: number) {
    return this.prisma.comment.findMany({
      where: { taskId },
    });
  }
}
