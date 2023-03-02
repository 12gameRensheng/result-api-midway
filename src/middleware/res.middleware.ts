import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

import { CODES,MESSAGES, MSG_KEY } from '../constant/res';

@Middleware()
export class ResMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log('中间件')

      const result = await next();
      
      // 默认消息体
      let message = MESSAGES.SUCCESS;

      // 如果有表头设置
      if (ctx.request.header[MSG_KEY])  {
        message = ctx.request.header[MSG_KEY].toString();
      // 没有的话 走路径匹配 消息体
      } else {
        const urls = ctx.originalUrl.split('/')
        let url = urls[urls.length - 1];
        // 转大写
        if (MESSAGES[url.toLocaleUpperCase()]) {
          message = MESSAGES[url.toLocaleUpperCase()]
        }
      }

      // 返回给上一个中间件的结果
      return {
        code: CODES.SUSSUES,
        result,
        message
      };
    };
  }
}
