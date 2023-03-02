import type * as mongoose from 'mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

// 创建模型
export interface CreateModel<T>  {
    _doc: T;
}

// 更新单个模型
export type UpdateOne = mongoose.UpdateWriteOpResult;

// 删除单个模型
export type DeleteOne = mongoose.DeleteResult;

// 连表查询
export type PopulateInfo = {
    /** space delimited path(s) to populate */
    path: string;
    /** fields to select */
    select?: any;
    /** query conditions to match */
    match?: any;
}

// 合并模型
export type MergeReturnModelType<T> = ReturnModelType & T;