import type * as mongoose from 'mongoose';

import RespondTypes from '../respond'

/*
// 继承写法
export interface UserInfo {
  account: string;
  password: string;
  nickname?: string;
}

export interface UserInfoCreate extends UserInfo {
  _id: mongoose.SchemaTypeOptions<any>['_id'];
}
*/

// 声明
export type RoleInfo = {
  // _id: mongoose.SchemaTypeOptions<any>['_id'];
  _id: Types.ObjectId;
  name: string;
  remark: string;
}

// 创建账号 剔除 Omit  password 密码
export type CreateInfo = Omit<RoleInfo, 'password'>;

// 更新信息 所有变为 可选 但是 _id 是必选 此处采取联合类型
export type UpdateInfo = Partial<userInfo> & {_id:string};


// 查询列表信息
export type QueryRoleInfo = {
  name: Object|string;
  remark: Object|string;
}

// 查询列表信息 结合 分页参数信息
export type MerageQueryRoleInfoType = RespondTypes.MergePaginationQueryParamType<QueryRoleInfo>;