import { MidwayConfig } from '@midwayjs/core';

// import { User } from '../entity/user';


export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1677642943459_3619',
  koa: {
    port: 7001,
  },
  /** 
   * mongodb 
   * http://www.midwayjs.org/docs/extensions/mongodb
   */
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://127.0.0.1:27017/test', // ipv6中 localhost 不等于127.0.0.1 记得
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        // 关联实体
        entities: [ 
          "entity"
         ]
      }
    }
  },
  /** 
   * redis 
   * http://www.midwayjs.org/docs/extensions/redis#%E9%85%8D%E7%BD%AE-redis
   */
  redis: {
    client: {
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      password: "",
      db: 0,
    },
  },
  /**
   * jwt
   * http://www.midwayjs.org/docs/extensions/jwt
   */
  jwt: {
    secret: '12345678ads12231', // fs.readFileSync('xxxxx.key')
    expiresIn: '300s', // https://github.com/vercel/ms
    refreshIn: '1h', 
  },
  /** 验证码 */
  captcha: {
    noise: 4,
    color: true,
    background: '#eee',
    mathOperator: '+/-',
    mathMin: 1,
    mathMax: 15,
  }
} as MidwayConfig;
