import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

import type { SimpleForm } from '../types/simpleForm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('completed')
  getCompleted() {
    return this.appService.getAllFormsFromDir('completed');
  }

  @Get('active')
  getActive() {
    return this.appService.getAllFormsFromDir('active');
  }

  @Get(':folder/:filename')
  getOne(@Param('folder') folder: string, @Param('filename') filename: string) {
    return this.appService.getSingleForm(`${folder}/${filename}`);
  }

  @Post()
  post(@Body() body: SimpleForm) {
    return this.appService.postFile(body);
  }

  @Put(':folder')
  put(@Param('folder') folder: string, @Body() body: SimpleForm) {
    return this.appService.putFile(folder, body);
  }

  @Delete(':folder/:filename')
  delete(@Param('folder') folder: string, @Param('filename') filename: string) {
    return this.appService.deleteFile(folder, filename);
  }
}
