import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class DemoService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    console.log(mongoose);
    return this.configService.get<string>('mongo');
  }
}
