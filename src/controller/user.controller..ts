import { Controller, Get, Inject, Body,Post, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { UserCreateDTO, UserUpdateDTO,UserDeleteDTO, UserShowDTO, UserIndexDTO } from '../dto/user';
import { UserService } from '../service/user.service';
import ModelTypes from '../types/model';
import RespondTypes from '../types/respond';
import UserEntiyTypes from '../types/user';

@Controller('/user')
export class HomeController {
  @Inject()
  userService: UserService;

  @Get('/index')
  @Validate()
  /**
   * 列表 用户
   * @param user:UserIndexDTO
   * @author zengye
   * @date 2023.03.01 18:01
   */
  async index(@Query() params:UserIndexDTO): Promise<RespondTypes.PaginationType<UserEntiyTypes.UserInfo[]>> {
    return await this.userService.index(params);
  }

  @Get('/show')
  @Validate()
  /**
   * 创建用户
   * @param user:UserShowDTO
   * @author zengye
   * @date 2023.03.01 18:01
   */
  async show(@Query() user:UserShowDTO): Promise<UserEntiyTypes.UserInfo> {
    return await this.userService.show(user);
  }

  
  @Post('/create')
  @Validate()
  /**
   * 创建用户
   * @param user:UserInfoDTO
   * @author zengye
   * @date 2023.03.01 14:20
   */
  async create(@Body() user:UserCreateDTO): Promise<UserEntiyTypes.CreateInfo> {
    return await this.userService.create(user);
  }

  @Post('/update')
  @Validate()
  /**
   * 更新用户 
   * @param user:UserUpdateDTO
   * @author zengye
   * @date 2023.03.01 17:48
   */
  async update(@Body() user:UserUpdateDTO): Promise<UserEntiyTypes.UserInfo> {
    return await this.userService.update(user);
  }

  @Post('/delete')
  @Validate()
  /**
   * 删除用户 
   * @param user:UserDeleteDTO 
   * @author zengye
   * @date 2023.03.01 17:48
   */
  async home(@Body() user:UserDeleteDTO): Promise<ModelTypes.DeleteOne> {
    return await this.userService.delete(user);
  }
}
