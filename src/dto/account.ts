import { Rule, RuleType } from "@midwayjs/validate";
import { IsRequired } from ".";
import { accountRule, passwordRule } from "./user";

// 登录 账号密码
export class AccountLoginDTO {
    @Rule(IsRequired(accountRule))
    account:string;

    @Rule(IsRequired(passwordRule))
    password:string;

    @Rule(RuleType.number().required())
    code:number;
}

// 刷新token
export class RefreshTokenDTO {
    @Rule(RuleType.string().required().min(20))
    token:string;
}