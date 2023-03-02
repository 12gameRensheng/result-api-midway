import { Provide } from "@midwayjs/core";
import { User } from "../entity/user"; // 取一个模型
import ModelTypes from "../types/model";
import RespondTypes from "../types/respond";

@Provide()
export class ModelService {

    /**
     * 封装分页
     * @param model 模型
     * @param params 参数
     * @param field 拿取字段
     * @param populate 联表
     * @author zengye
     * @date 2023.03.01
     */
    async Pagination(model:ModelTypes.MergeReturnModelType<User>,params:RespondTypes.MergePaginationQueryParamType<RespondTypes.PaginationQueryParamType>,field:string = '', populate:ModelTypes.PopulateInfo[] = []) {
        const sortDesc = params.sortDesc as RespondTypes.SortDescType; // 限制值
        const list = await model.find(params, field)
                                .sort({
                                    [params.sortField]: sortDesc
                                })
                                .skip((params.page - 1) * params.pageSize)
                                .limit(params.pageSize)
                                .populate(populate)
                                ;
        const count = await model.count(params);
        return {
            list,
            count,
            page: params.page,
            pageSize: params.pageSize
        }
    }
}