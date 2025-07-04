import { IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.pending })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  projectId?: number;
}
