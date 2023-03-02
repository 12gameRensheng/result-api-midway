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
export type UserInfo = {
  // _id: mongoose.SchemaTypeOptions<any>['_id'];
  _id: Types.ObjectId;
  account: string;
  password: string;
  name: string;
}

// 创建账号 剔除 Omit  password 密码
export type CreateInfo = Omit<UserInfo, 'password'>;

// 登录
export type LoginInfo = {
  token:string;
  userInfo:UserInfo;
}

// 更新信息 所有变为 可选 但是account 是必选 此处采取联合类型
export type UpdateInfo = Partial<userInfo> & {account:string};


// 查询列表信息
export type QueryUserInfo = {
  account: Object|string;
  name: Object|string;
}

// 查询列表信息 结合 分页参数信息
export type MerageQueryUserInfoType = RespondTypes.MergePaginationQueryParamType<QueryUserInfo>;