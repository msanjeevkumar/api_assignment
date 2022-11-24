import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/v1/users')
  createUser(username: string, password: string) {
    return this.appService.createUser(username, password);
  }

  @Post('/v1/login')
  login(username: string, password: string) {
    return this.appService.login(username, password);
  }
}
