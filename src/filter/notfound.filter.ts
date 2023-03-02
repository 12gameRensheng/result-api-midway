import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { CODES,MESSAGES } from '../constant/res';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    // ctx.redirect('/404.html');

    // 如果想要接口返回 那么在 configuration.ts 引入即可
    return {code: CODES.NOTFOUND,message: MESSAGES.NOTFOUND}
  }
}
