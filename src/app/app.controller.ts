import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

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
