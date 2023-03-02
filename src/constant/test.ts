// 定义一个列表的 有 page 分页 pageSize 条数  
type PageType = {
    page:number;
    pageSize:number;
}

// 合并传递的
type MergePageType<T extends Record<string, unknown>> = PageType & T;

// 定义一个 用户字段  有 account 账号 name 名称
type UserInfoType = {
    name:string;
    account:string;
}

// 用户字段 + 分页 条数
type UserInfoMergePageType = MergePageType<UserInfoType>;

/**
 * 封装函数 分页 条数 这里还有 模型对应字段传递过来的参数
 * @param model 模型
 * @param params 查询参数
 */
function paging(model,params:MergePageType<PageType>) {
    // 分页 和 拿取数据 以及需要对 account 和 name 查询
    return model.find(params)
        .skip((params.page - 1) * params.pageSize) // 跳转数据
        .limit(params.pageSize) // 拿取条数
        ;
    
}

// 函数 查询列表
function getList(params:UserInfoMergePageType) {
    const query = {
        name: '管理员',
        account: 'admin',
        ...params
    };
    const model = {}; // 模型
    // MergePageType<UserInfoType>
    return paging(model,query);
}

// 场景： 用户模型 有字段  account  和 name 需要走封装好的 分页函数（只需要 page Size即可） 去查询数据
// 目前有没有更好的封装方式 或写法 对ts还不是很熟悉
