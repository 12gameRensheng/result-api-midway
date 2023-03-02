import { prop,Ref } from '@typegoose/typegoose';
import { DEFAULT_ID } from '../constant/entity';
import { Role } from './role';
import { EntityBase } from '../entityBase';

// @index({ article: 1, user: 1 }, { unique: true }) // 联合索引
// @index({ location: '2dsphere' }) 
// @index({ article: 1 }, { partialFilterExpression: { stars: { $gte: 4.5 } } })
export class User extends EntityBase {
    @prop({ unique: true, index: true, message: '账号名 不得重复' })
    public account: string; // 账号

    @prop()
    public name: string; // 账号名称
    
    @prop()
    public password: string; // 密码

    @prop({ default: DEFAULT_ID, ref: () => Role })
    role ?:Ref<Role>; // 角色id
}