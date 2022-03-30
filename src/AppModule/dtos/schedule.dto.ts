import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class ScheduleDto {
  @ApiProperty({
    default: '6242e99df9e217c1c73c383d',
  })
  @IsString()
  _id: string;
  @ApiProperty({
    default: '20:22',
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    default: 'hoductri/feeds/bbc-led2',
  })
  @IsString()
  key_id: string;
  @ApiProperty({
    default: '0',
  })
  @IsString()
  repeat: string;

  @ApiProperty({
    default: true,
  })
  @IsBoolean()
  status: boolean;
  @ApiProperty({
    default: true,
  })
  @IsBoolean()
  active: boolean;
}
 