import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'THIEN', 
      username: 'thien1234',
      database: 'delivery',
      password: 'thien123', 
      autoLoadEntities: true, 
      logging: true,
      requestTimeout: 300000
    }),
  ],
})
export class MssqlModule {}