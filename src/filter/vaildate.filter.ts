import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';

import { CODES,MESSAGES } from '../constant/res';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
    async catch(err: MidwayValidationError,ctx: Context) {
        return {
            code: CODES.VALIDATE,
            message: MESSAGES.VALIDATE + err.message,
        }
    }
}