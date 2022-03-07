import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mqttService } from '../../mqtt'

@Injectable()
export class DemoService {
  constructor(private configService: ConfigService, private mqttService: mqttService) {}
  getHello(): string { 
    this.mqttService.publish('helloThien/f/bbc-led','1')
    return this.configService.get<string>('mongo');
  }
}
