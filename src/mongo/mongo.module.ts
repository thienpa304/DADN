import { MongoService } from './mongo.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MongoService],
})
export class MongoModule {}
