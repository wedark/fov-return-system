import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import type { SimpleForm } from '../../types/form';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
