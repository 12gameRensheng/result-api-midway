import { Inject, Middleware } from '@midwayjs/decorator';

import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

import type { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class Jwtmiddleware {
    @Inject()
    jwtService: JwtService;

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
           // 判断下有没有校验信息
            if (!ctx.headers['authorization']) {
                throw new httpError.UnauthorizedError();
            }
            // 从 header 上获取校验信息
            const parts = ctx.get('authorization').trim().split(' ');

            if (parts.length !== 2) {
                throw new httpError.UnauthorizedError();
            }

            const [scheme, token] = parts;

            if (!/^Bearer$/i.test(scheme)) {
                throw new httpError.ForbiddenError();
            }

            try {
                const userAccount = await this.jwtService.verify(token, {
                    complete: true,
                });
                // 这里定义 是为了拿取到 token对应的用户身份
                ctx.userAccount = userAccount;
            } catch (error) {
                console.log('error')
                throw new httpError.UnauthorizedError();
            }
            await next();
        }
    }

    // 忽略的路径
    ignore(ctx: Context): boolean {
        const ignorePathList = [
            '/api/login',
            '/api/captcha',
        ];
        return ignorePathList.includes(ctx.path);
    }
}