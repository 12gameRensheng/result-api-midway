import { Rule,RuleType } from "@midwayjs/validate";
import { STATUS_ALL } from "../constant/entity";
  

/**
 * 分页验证
 * @author zengye
 * @dete 2023.03.01 18:20
 */
export class PaginationDTO {
    // 分页
    @Rule(RuleType.number().default(1))
    page:number;

    // 默认条数 10
    @Rule(RuleType.number().default(10))
    pageSize:number;

    // 排序字段
    @Rule(RuleType.string().default('_id'))
    sortField:string;

    // 排序方式 -1 倒序  1正序
    @Rule(RuleType.number().default(-1).valid(-1,1).error(new Error('排序值只能为：-1 1')))
    sortDesc:number;

    // 开始日期
    @Rule(RuleType.number())
    startTime:number;

    // 结束日期
    @Rule(RuleType.number())
    endTime:number;
}

/**
 * 必填
 * @param rule 
 * @returns 
 * @author zengye
 * @dete 2023.03.01 18:21
 */
export const IsRequired = (rule) => rule.required();

// 状态
export const StatusRuleType = RuleType.number().valid(...STATUS_ALL);

// 系统id
export const IsObjectId = RuleType.string().length(24);

// 系统id 验证
export class ObjectIdDTO {
    // 系统id
    @Rule(IsRequired(IsObjectId))
    _id:string;
}