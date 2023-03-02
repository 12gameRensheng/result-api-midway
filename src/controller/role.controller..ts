import { Controller, Get, Inject, Body,Post, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { ObjectIdDTO } from '../dto';
import { RoleCreateDTO, RoleIndexDTO, RoleUpdateDTO } from '../dto/role';
import { RoleService } from '../service/role.service';
import { UserService } from '../service/user.service';
import ModelTypes from '../types/model';
import RespondTypes from '../types/respond';
import RoleEntiyTypes from '../types/role';

@Controller('/role')
export class HomeController {
  @Inject()
  userService: UserService;

  @Inject()
  roleService: RoleService;

  @Get('/index')
  @Validate()
  /**
   * 列表 角色
   * @param role:UserShowDTO
   * @author zengye
   * @date 2023.03.02 09:21
   */
  async index(@Query() params:RoleIndexDTO): Promise<RespondTypes.PaginationType<RoleEntiyTypes.RoleInfo[]>> {
    return await this.roleService.index(params);
  }

  @Get('/show')
  @Validate()
  /**
   * 查询详情 角色
   * @param role:UserShowDTO
   * @author zengye
   * @date 2023.03.02 00:18
   */
  async show(@Query() role:ObjectIdDTO): Promise<RoleEntiyTypes.RoleInfo> {
    return await this.roleService.show(role);
  }

  
  @Post('/create')
  @Validate()
  /**
   * 创建 角色
   * @param role:RoleCreateDTO
   * @author zengye
   * @date 2023.03.01 23:59
   */
  async create(@Body() role:RoleCreateDTO): Promise<RoleEntiyTypes.CreateInfo> {
    return await this.roleService.create(role);
  }

  @Post('/update')
  @Validate()
  /**
   * 更新 角色
   * @param user:UserUpdateDTO
   * @author zengye
   * @date 2023.03.01 23:59 
   */
  async update(@Body() role:RoleUpdateDTO): Promise<RoleEntiyTypes.RoleInfo> {
    return await this.roleService.update(role);
  }

  @Post('/delete')
  @Validate()
  /**
   * 删除 角色
   * @param user:UserDeleteDTO 
   * @author zengye
   * @date 2023.03.01 23:59
   */
  async home(@Body() role:ObjectIdDTO): Promise<ModelTypes.DeleteOne> {
    return await this.roleService.delete(role);
  }
}
