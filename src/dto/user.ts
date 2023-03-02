import { OmitDto,PickDto, Rule,RuleType } from '@midwayjs/validate';
import { IsObjectId, IsRequired, PaginationDTO, StatusRuleType } from '.';

// 账号
export const accountRule = RuleType.string().min(4).max(12).error(new Error('账号 必须填写 且 4- 12位'))

// 名称
export const nameRule = RuleType.string().min(2).max(12).error(new Error('名称 必须填写 且 2-12位'));

// 密码
export const passwordRule =  RuleType.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).error(new Error('密码 包含数字和英文6-20位'))

// 用户
export class UserDTO {
    // 账号
    @Rule(accountRule)
    account:string;

    // 名称
    @Rule(nameRule)
    name:string;

    // 密码
    @Rule(passwordRule)
    password:string;

    // 角色
    @Rule(IsObjectId)
    role:string;

    // 状态
    @Rule(StatusRuleType)
    status:number;

    // 验证码
    @Rule(RuleType.string().required().length(4).error(new Error('验证码 必须填写')))
    code:string;
}

// 创建 用户 三个都是必选
export class UserCreateDTO extends OmitDto(UserDTO, ['code']) {
     // 账号
     @Rule(IsRequired(accountRule))
     account:string;

     // 名称
     @Rule(IsRequired(nameRule))
     name:string;
 
     // 密码
     @Rule(IsRequired(passwordRule))
     password:string;
}


// 更新 用户 必选是 账号
export class UserUpdateDTO extends PickDto(UserDTO, ['account', 'password', 'name', 'role', 'status']) {
    // 账号
    @Rule(IsRequired(accountRule))
    account:string;
}

// 详情 用户
export class UserShowDTO extends PickDto(UserDTO, ['account']) {
    // 账号
    @Rule(IsRequired(accountRule))
    account:string;
}

// 删除 必选是账号
export class UserDeleteDTO extends PickDto(UserDTO, ['account']) {
    // 账号
    @Rule(IsRequired(accountRule))
    account:string;
}

// 账号信息 剔除 code
export class UserInfoDTO extends OmitDto(UserDTO, ['code']) {}


// 列表 用户
export class UserIndexDTO extends PaginationDTO {
     // 账号
     @Rule(accountRule.min(1))
     account:string;
 
     // 名称
     @Rule(nameRule.min(1))
     name:string;

     // 角色
     @Rule(IsObjectId)
     role:string;
}


