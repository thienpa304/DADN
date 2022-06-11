import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './AppModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MssqlModule } from './mssql'
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const configService = app.get(ConfigService);
  const port = configService.get('http.port'); 

  app.enableCors();
  await app.listen(port);
}
bootstrap();
