import { MongoModule } from '../mongo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './Service';
import { CommonModule } from '../common';
import { MQTTModule } from '../mqtt';

@Module({
  imports: [CommonModule, MongoModule, MQTTModule],
  controllers: [AppController],
  providers: [...AppService],
})
export class AppModule {}
