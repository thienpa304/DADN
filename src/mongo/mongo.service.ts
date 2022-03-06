import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoService {
  constructor(private configService: ConfigService) {
    this.init();
  }
  init() {
    mongoose.connect(this.configService.get<string>('mongo.url'));
  }
}
