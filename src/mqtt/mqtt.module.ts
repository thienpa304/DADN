import { mqttService } from './mqtt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [mqttService],
  exports: [mqttService]
})
export class MQTTModule {}
