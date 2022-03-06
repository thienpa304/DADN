import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';

@Injectable()
export class MongoService {
  private Client;
  private url: string;
  private port: number;
  private username: string;
  private password: string;

  constructor(private configService: ConfigService) {
    const mqttConfig = configService.get('mqtt');
    this.url = mqttConfig.url || '';
    this.username = mqttConfig.username || '';
    this.password = mqttConfig.password || '';
    this.port = mqttConfig.port || 0;
    this.init();
  }

  init() {
    this.Client = mqtt.connect(this.url, {
      port: this.port,
      username: this.username,
      password: this.password,
    });
  }

  publish(key: string, data: any) {
    this.Client.subscribe(key, (err) => {
      if (!err) {
        this.Client.publish(key, data);
      }
    });
  }

  consumer(key: string, callback: (key: string, message: object) => void) {
    this.Client.on('message', (topicKey, message) => {
      if (topicKey == key) {
        callback(topicKey, message);
      }
    });
  }
}
