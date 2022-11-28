import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "./user.dto";

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
  async createUser(@Body() body: UserDto): Promise<void> {
    await this.appService.createUser(body.username, body.password);
  }

  @Post('/v1/login')
  login(@Body() body: UserDto): Promise<string> {
    return this.appService.login(body.username, body.password);
  }
}
