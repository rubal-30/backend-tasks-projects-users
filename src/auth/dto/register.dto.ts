import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto 
{
  @ApiProperty({ example: 'Rakesh' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'drrakesh@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Boy@123', minLength: 6 })
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ enum: Role, default: Role.user })
  role?: Role;
}
