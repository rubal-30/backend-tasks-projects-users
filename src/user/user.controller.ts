import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', required: true })
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: 'Get tasks for a user' })
  getUserTasks(@Param('id') id: string) {
    return this.userService.findUserTasks(id);
  }

  @Get(':id/projects')
  @ApiOperation({ summary: 'Get projects for a user' })
  getUserProjects(@Param('id') id: string) {
    return this.userService.findUserProjects(id);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get comments for a user' })
  getUserComments(@Param('id') id: string) {
    return this.userService.findUserComments(id);
  }
}
