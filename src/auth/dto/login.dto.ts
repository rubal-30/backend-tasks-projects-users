import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto 
{
  @ApiProperty({ example: 'drrakesh@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Boy@123' })
  @IsNotEmpty()
  password: string;
}
