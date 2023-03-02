import { Rule,RuleType } from '@midwayjs/validate';
import { IsRequired, IsObjectId,PaginationDTO } from '.';

// 名称
const nameRule = RuleType.string().min(2).max(12).error(new Error('名称 必须填写 且 2-12位'));

// 角色
export class RoleDTO {
    // 名称
    @Rule(nameRule)
    name:string;

    // 备注
    @Rule(RuleType.string())
    remark:string;
}

// 创建 角色
export class RoleCreateDTO extends RoleDTO {
     // 名称
     @Rule(IsRequired(nameRule))
     name:string;
}


// 更新 角色 删除
export class RoleUpdateDTO extends RoleDTO {
    // 系统id
    @Rule(IsObjectId)
    _id:string;
}

// 列表 角色
export class RoleIndexDTO extends PaginationDTO {
    // 名称
    @Rule(nameRule)
    name:string;

    // 备注
    @Rule(RuleType.string())
    remark:string;
}
