import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { CODES,MESSAGES } from '../constant/res';
import { ErrorCode } from '../types/error/index';
// ErrorCod

@Catch()
export class DefaultErrorFilter {
  message:string; // 错误消息
  code:number; // code码 500  

  /**
   * 构造函数
   * @param msg 错误消息
   * @param code code码
   */
  constructor(msg:string = '',code?:number) {
    this.message = msg || MESSAGES.ERROR;
    this.code = code || CODES.ERROR;
  }

  async catch(err: ErrorCode, ctx: Context) {
    // 错误日志
    // console.log('错误', err)
    ctx.logger.error('%j', err);
    // 所有的未分类错误会到这里
    return {
      code: err.code || this.code,
      message: err.message || this.message,
    };
  }
}
