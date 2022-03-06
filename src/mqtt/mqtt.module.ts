 import { MongoService } from './mqtt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MongoService],
})
export class MQTTModule {}
