import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
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
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id' , ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id' , ParseIntPipe) id: number) {
    return this.userService.findUserTasks(id);
  }

  @Get(':id/projects')
  getUserProjects(@Param('id' , ParseIntPipe) id: number) {
    return this.userService.findUserProjects(id);
  }

  @Get(':id/comments')
  getUserComments(@Param('id' , ParseIntPipe) id: number) {
    return this.userService.findUserComments(id);
  }
}
