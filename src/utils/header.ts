/**
 * 表头操作
 * @author zengye
 * @date 2023.03.01 15:19
 */
import { SetHeader} from '@midwayjs/core'
import { MSG_KEY } from '../constant/res';



/**
 * 设置响应消息体
 * @param ctx 响应体
 * @param value 消息值
 * @author zengye
 * @date 2023.03.01 15:19
 */
export function msg(value:string) {
    SetHeader(MSG_KEY, value);
}