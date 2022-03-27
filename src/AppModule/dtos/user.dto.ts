import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UserDto {
  @ApiProperty({
    default: 'your username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    default: 'your password',
  })
  @IsString()
  password: string;
}
