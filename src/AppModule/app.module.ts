import { MongoModule } from '../mongo';
import { Module } from '@nestjs/common';
import { MssqlModule } from '../mssql';
import { AppController } from './controllers';
import { AppService } from './services'
import { CommonModule } from '../common';
import { MQTTModule } from '../mqtt';
import { AppRepository } from './repositories';
import { AuthModule } from './auth';
import { TypeOrmModule } from '@nestjs/typeorm'
import Entity from '../mssql/entities'
@Module({
  imports: [CommonModule, MongoModule, MQTTModule, AuthModule, MssqlModule, TypeOrmModule.forFeature([...Entity])],
  controllers: [...AppController],
  providers: [...AppService, ...AppRepository],
})
export class AppModule {}
