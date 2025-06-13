import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
