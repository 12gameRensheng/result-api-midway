import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';
import { EntityBase } from '../entityBase';

@EntityModel()
export class Role extends EntityBase {
    @prop({ required:true })
    public name: string;
}