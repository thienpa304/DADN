import { Controller, Get } from '@nestjs/common';
import { DemoService } from './Service';

@Controller()
export class AppController {
  constructor(private readonly appService: DemoService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
