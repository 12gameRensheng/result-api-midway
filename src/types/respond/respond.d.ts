// 响应体 分页
export interface PaginationType<T>  {
    page: number;
    pageSize: number;
    count: number;
    list: T;
}

// 排序
export type SortDescType = -1|1;

// 分页参数 
export type PaginationQueryParamType = {
    page:number;
    pageSize: number;
    sortField: string;
    sortDesc: number|SortDescType;
}

// 合并 分页参数
export type MergePaginationQueryParamType<T> = PaginationQueryParamType & T;