import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';

// 引入 mongodb
import * as typegoose from '@midwayjs/typegoose';

// 引入 redis
import * as redis from '@midwayjs/redis';

// 引入 jwt
import * as jwt from '@midwayjs/jwt';


// 默认过滤器
import { DefaultErrorFilter } from './filter/default.filter';
// 验证错误过滤器
import { ValidateErrorFilter } from './filter/vaildate.filter';
// 404 找不到接口
import { NotFoundFilter } from './filter/notfound.filter';

// 响应中间件
import { ResMiddleware } from './middleware/res.middleware';

// 验证
import { AuthGuard } from './guard/auth.guard';
import { Jwtmiddleware } from './middleware/jwt.middleware';


@Configuration({
  imports: [
    koa,
    validate,
    typegoose,
    redis,
    jwt,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([Jwtmiddleware, ResMiddleware]);

    // add filter
    this.app.useFilter([DefaultErrorFilter,NotFoundFilter, ValidateErrorFilter, ]);

    // add guard
    this.app.useGuard([AuthGuard]);
  }
}
