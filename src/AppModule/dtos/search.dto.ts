import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class SearchDto {
  @IsString()
  @ApiProperty({
    default: '5',
  })
  filter: string;

  @ApiProperty({
    default: 'updated_at',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    default: 0,
  })
  @IsString()
  offset: number;

  @ApiProperty({
    default: 12,
  })
  @IsString()
  limit: number; 
}
