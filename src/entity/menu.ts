import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class Menu {
    @prop({ required:true })
    public name: string;
}