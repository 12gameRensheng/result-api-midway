// 错误类型
export interface ErrorCode {
    name: string;
    message: string;
    stack?: string;
    code: number;
}