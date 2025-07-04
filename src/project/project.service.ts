import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; // Import CACHE_MANAGER
import { Cache } from 'cache-manager';  // Cache Manager Interface

interface PageOpts {
  page: number;
  limit: number;
}

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,  // Inject Cache Manager
  ) {}

  // Method to create project
  create(dto: CreateProjectDto, userId: number) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId,
      },
    });
  }

  // Method to find all projects for a user with pagination and caching
  async findAllByUser(userId: number, opts: PageOpts) {
    const { page = 1, limit = 10 } = opts;
    const skip = (page - 1) * limit;

    const cacheKey = `projects:user:${userId}:page:${page}:limit:${limit}`;
    const cachedProjects = await this.cacheManager.get(cacheKey);

    if (cachedProjects) {
      return cachedProjects;  // Return cached projects
    }

    // Fetch projects from the database if not cached
    const projects = await this.prisma.project.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { id: 'asc' },
    });

    // Store the projects in cache with TTL
    await this.cacheManager.set(cacheKey, projects, 600);  // TTL directly passed as a number

    return projects;
  }

  // Method to find one project
  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  // Method to update project details
  async update(id: number, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  // Method to remove a project
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
