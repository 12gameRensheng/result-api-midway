import { Inject, Controller,Config, Post, Body } from '@midwayjs/core';
import { Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { createMathExpr,ConfigObject } from 'svg-captcha';
import svgBase64 = require('mini-svg-data-uri');
import { CacheService } from '../service/cache.service';
import { AccountLoginDTO,RefreshTokenDTO } from '../dto/account';
import { AccountService } from '../service/account.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  /**获取到 验证码的 配置 */
  @Config('captcha')
  captchaOption:ConfigObject;

  @Inject()
  accountService: AccountService;

  @Inject()
  cacheService: CacheService;

  @Post('/login')
  /**
   * 账号密码登录
   * @param user 账号密码
   * @author zengye
   * @date 2023.03.02
   */
  async login(@Body() user:AccountLoginDTO){
    return this.accountService.login(user);
  }

  @Post('/refresh')
  /**
   * 刷新获取到token
   * @param user token
   * @author zengye
   * @date 2023.03.02
   */
  async refresh(@Body() user:RefreshTokenDTO):Promise<string> {
    return this.accountService.refresh(user);
  }

  @Get('/captcha')
  /**
   * 获取到验证码
   * @author zengye
   * @date 2023.03.02
   */
  async captcha():Promise<string> {
    // 获取到验证码
    const captcha = createMathExpr(this.captchaOption)
    const key = this.ctx.ip + '_' + this.ctx.request.header['user-agent'];
    console.log(key, '验证码', captcha.text);
    this.cacheService.set(key, captcha.text, 60);
    return svgBase64(captcha.data);
  }
}
