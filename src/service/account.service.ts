import { Config, Inject, Provide } from "@midwayjs/core";
import { JwtService } from "@midwayjs/jwt";
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from "@typegoose/typegoose";
import { STATUS } from "../constant/entity";
import { AccountLoginDTO,RefreshTokenDTO } from "../dto/account";
import { User } from "../entity/user";
import { DefaultErrorFilter } from "../filter/default.filter";
import { CacheService } from "./cache.service";

@Provide()
export class AccountService {
    @Inject()
    ctx:Context;

    @Inject()
    cacheService: CacheService;

    @Inject()
    jwtService: JwtService;

    @Config('jwt')
    jwtConfig;

    @InjectEntityModel(User)
    userModel: ReturnModelType<typeof User>;

    /**
     * 登录
     * @param user 登录信息
     * @author zengye 
     * @date 2023.03.02 15:53
     */
    async login(user:AccountLoginDTO) {
        const key = this.ctx.ip + '_'+ this.ctx.request.header['user-agent'];
        const code = await this.cacheService.get(key);
        if (!code || Number(code) != user.code) throw new DefaultErrorFilter('验证码错误');

        // 查询账号
        const result = await this.userModel.findOne({ account: user.account}).populate('role');
        if (!result) throw new DefaultErrorFilter('无此账号');
        if (result.status != STATUS) throw new DefaultErrorFilter('账号已被停用');

        // 验证账号
        return {
            ...await this.createToken({ _id: result._id, account: result.account }),
            _id: result._id,
            name: result.name,
            account: result.account,
            role: result.role,
        }
    }

    /**
     * 刷新获取到token
     * @param user 登录信息
     * @author zengye 
     * @date 2023.03.02 15:53
     */
    async refresh(user:RefreshTokenDTO):Promise<string> {
        try{
            const userAccount:any = await this.jwtService.verify(user.token, {
                complete: true,
            });

            if (this.ctx.userAccount.payload._id != userAccount.payload._id) {
                throw new DefaultErrorFilter('身份异常');
            }

            const { token } = await this.createToken({ _id: userAccount.payload._id, account: userAccount.payload.account })
            return token;
        }catch(error){
            throw new DefaultErrorFilter(error.message || '身份错误');
        }
    }

    /**
     * 创建token
     * @param result 参数
     * @returns 
     * @author zengye 
     * @date 2023.03.02 15:53
     */
    async createToken (result:object) {
        const { secret, expiresIn, refreshIn } = this.jwtConfig;
        return {
            token: await this.jwtService.sign(result, secret, { expiresIn }),
            refreshToken: await this.jwtService.sign(result, secret, { expiresIn: refreshIn })
        }
    }
}