import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Context } from '@midwayjs/koa';
import { DefaultErrorFilter } from '../filter/default.filter';
import ModelTypes from '../types/model';
import { ModelService } from './model.service';
import RespondTypes from '../types/respond';
import { Role } from '../entity/role';
import { RoleCreateDTO, RoleIndexDTO, RoleUpdateDTO } from '../dto/role';
import RoleEntiyTypes from '../types/role';
import { ObjectIdDTO } from '../dto';
import { User } from '../entity/user';
// import { msg } from '../utils/header';

@Provide()
export class RoleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @InjectEntityModel(Role)
  roleModel: ReturnModelType<typeof Role>;

  @Inject()
  modelService: ModelService;

  /**
   * 列表
   * @param params 角色
   * @returns 
   * @author zengye 
   * @date 2023.03.02 09:32
   */
   async index(params:RoleIndexDTO):Promise<RespondTypes.PaginationType<RoleEntiyTypes.RoleInfo[]>>  {
    const query:RoleEntiyTypes.MerageQueryRoleInfoType = {...params};
    if (query.name) {
      query.name = { $regex: params.name }
    }
    if (query.remark) {
      query.remark = { $regex: params.remark }
    }

    // 分页查询
    const result = await this.modelService.Pagination(this.roleModel, query)
    return result;
  }

  /**
   * 查询详情
   * @param user 账号
   * @returns 
   * @author zengye 
   * @date 2023.03.02 09:32
   */
  async show(role:ObjectIdDTO):Promise<RoleEntiyTypes.RoleInfo>  {
    // 查找
    const result = await this.roleModel.findById(role._id);
    return result;
  }

  /**
   * 创建角色
   * @param role 角色信息
   * @returns
   * @author zengye 
   * @date 2023.03.02 09:32
   */
  async create(user:RoleCreateDTO):Promise<RoleEntiyTypes.CreateInfo> {
    // 查找名称
    const limit = await this.roleModel.count({ name: user.name });
    if (limit) throw new DefaultErrorFilter('已存在角色：' + user.name );
    const result = await this.roleModel.create(user);
    return result;
  }

  /**
   * 更新 角色
   * @param role 角色信息体
   * @returns
   * @author zengye 
   * @date 2023.03.02 09:32
   */
  async update(role:RoleUpdateDTO):Promise<RoleEntiyTypes.RoleInfo> {
      // 查找
      const resultOne = await this.roleModel.findById(role._id);
      if (!resultOne) throw new DefaultErrorFilter('没有该角色');

      if (role._id) delete role._id;
      for(const i in role) {
        resultOne[i] = role[i];
      }
      return await resultOne.save();
  }

  /**
   * 删除 角色
   * @param role 删除角色
   * @returns
   * @author zengye 
   * @date 2023.03.02 09:32
   */
  async delete(role:ObjectIdDTO):Promise<ModelTypes.DeleteOne> {
      // 判断是否有用户在这个角色
      const limit = await this.userModel.count({ role: role._id});
      if (limit) throw new DefaultErrorFilter('此角色下有用户 ， 麻烦先删除掉用户');
      const result = await this.roleModel.deleteOne({ _id: role._id});
      return result;
  }
}
