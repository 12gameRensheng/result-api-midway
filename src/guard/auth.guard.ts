import { Guard, IGuard,httpError  } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(context: Context, supplierClz, methodName: string): Promise<boolean> {
    

    // console.log(context.userAccount)
    

    if (methodName === 'test' ) {
        throw new httpError.ForbiddenError();
    }
    return true;
  }
}