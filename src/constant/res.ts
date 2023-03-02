/**
 * 响应 状态码
 * @author:zengye
 * @date: 2023.03.01 14:41
 */

// 状态码
const CODES = {
    SUSSUES: 200, // 成功
    VALIDATE: 422, // 验证参数错误
    NOTFOUND: 404, // 404
    ERROR: 500, // 错误
}

// 消息体
const MESSAGES = {
    SUCCESS: '成功',
    INDEX: '查询成功',
    LIST: '查询成功',
    SHOW: '详情成功',
    INFO: '详情成功',
    CREATE: '创建成功',
    UPDATE: '更新成功',
    DELETE: '删除成功',
    ERROR: '错误',
    NOTFOUND: '404',
    VALIDATE: '验证参数错误 ',
}

// 消息键值
const MSG_KEY = 'msg';

export {
    CODES,
    MESSAGES,
    MSG_KEY
};