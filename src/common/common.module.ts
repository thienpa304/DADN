import { Global, Module } from '@nestjs/common';
import config, { ConfigModule } from './config'; 
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    })
  ],
})
export class CommonModule {}
