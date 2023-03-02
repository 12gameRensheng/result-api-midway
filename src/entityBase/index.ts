import { prop,pre } from '@typegoose/typegoose';
import { STATUS, STATUS_ALL } from '../constant/entity';

// 进行监听 保存
@pre<EntityBase>('save', function(next) { 
    this.updated_at = Date.now();
    next();
})

export class EntityBase {
    @prop({ enum: STATUS_ALL, default: STATUS })
    public status: number; // 状态

    @prop()
    public remark: string; // 备注

    @prop({ default: Date.now })
    created_at:number; // 创建 时间戳


    @prop({ default: 0 })
    updated_at: number; // 更新时间戳
}