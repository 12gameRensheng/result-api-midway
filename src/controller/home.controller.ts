import { Controller, Get, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/')
export class HomeController {
  @Inject()
  userService: UserService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/test')
  async test(): Promise<string> {
    return 'test';
  }
}
