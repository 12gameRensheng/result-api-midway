import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Context } from '@midwayjs/koa';
import { User } from '../entity/user';
import { UserCreateDTO, UserUpdateDTO,UserDeleteDTO, UserShowDTO, UserIndexDTO } from '../dto/user';
import { DefaultErrorFilter } from '../filter/default.filter';
import UserEntiyTypes from '../types/user';
import ModelTypes from '../types/model';
import { ModelService } from './model.service';
import RespondTypes from '../types/respond';
// import { msg } from '../utils/header';

@Provide()
export class UserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  modelService: ModelService;

  /**
   * 列表
   * @param params 账号
   * @returns 
   * @author zengye 
   * @date 2023.03.01 18:01
   */
   async index(params:UserIndexDTO):Promise<RespondTypes.PaginationType<UserEntiyTypes.UserInfo[]>>  {
    // const query:UserEntiyTypes.QueryUserInfo = {...params};
    const query:UserEntiyTypes.MerageQueryUserInfoType = {...params};
    if (query.account) {
      query.account = { $regex: params.account }
    }
    if (query.name) {
      query.name = { $regex: params.name }
    }

    // 分页查询 查询到角色表
    const result = await this.modelService.Pagination(this.userModel, query, '_id account name created_at updated_at', [ { path: 'role', select: '_id name remark'} ])
    return result;
  }

  /**
   * 查询详情
   * @param user 账号
   * @returns 
   * @author zengye 
   * @date 2023.03.01 18:01
   */
  async show(user:UserShowDTO):Promise<UserEntiyTypes.UpdateInfo>  {
    const result = await this.userModel.findOne({ account: user.account });
    return result;
  }

  /**
   * 创建用户
   * @param user 账号信息体
   * @returns
   * @author zengye 
   * @date 2023.03.01 16:38
   */
  async create(user:UserCreateDTO):Promise<UserEntiyTypes.CreateInfo> {
    // 查找账号
    const limit = await this.userModel.count({ account: user.account });
    if (limit) throw new DefaultErrorFilter('已存在账号：' + user.account);

    // 方式1： 默认创建成功后的类型是 UserEntiyTypes.CreateInfo 但此处需要把密码给默认掉 所以采取这种方式 
    // const result = await this.userModel.create(user) as unknown as ModelTypes.CreateModel<UserEntiyTypes.UserInfo>;
    // return {...result._doc,...{password: ''}}; // 剔除 password 字段

    // 方式2： 直接傻瓜式重写
    const result = await this.userModel.create(user);
    return { _id: result._id, account: result.account, name: result.name, }
  }

  /**
   * 更新用户
   * @param user 账号信息体
   * @returns
   * @author zengye 
   * @date 2023.03.01 17:26
   */
  async update(user:UserUpdateDTO):Promise<UserEntiyTypes.UserInfo> {
      // 查找账号
      const resultOne = await this.userModel.findOne({ account: user.account });
      if (!resultOne) throw new DefaultErrorFilter('没有该账号');

      for(const i in user) {
        resultOne[i] = user[i];
      }
      return await resultOne.save();
  }

  /**
   * 删除用户
   * @param user 账号信息体
   * @returns
   * @author zengye 
   * @date 2023.03.01 17:26
   */
  async delete(user:UserDeleteDTO):Promise<ModelTypes.DeleteOne> {
      const result = await this.userModel.deleteOne({ account: user.account });
      return result;
  }
}
