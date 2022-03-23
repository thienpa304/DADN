import { MongoModule } from '../mongo';
import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services'
import { CommonModule } from '../common';
import { MQTTModule } from '../mqtt';
import { AppRepository } from './repositories';
@Module({
  imports: [CommonModule, MongoModule, MQTTModule],
  controllers: [...AppController],
  providers: [...AppService, ...AppRepository],
})
export class AppModule {}
