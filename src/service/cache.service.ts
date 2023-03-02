import { Inject, Provide } from "@midwayjs/core";
import { RedisService } from "@midwayjs/redis";

@Provide()
export class CacheService {
    @Inject()
    redisService: RedisService;

    /**
     * 获取数据
     * @param key 
     * @returns 
     * @author zengye 
     * @date 2023.03.02 14:17
     */
    async get(key:string) {
        return await this.redisService.get(key);
    }

    /**
     * 设置数据
     * @param key 键值
     * @param value 值
     * @param time 过期时间
     * @returns 
     */
    async set(key:string,value:string | number,time:number = 300) {
        await this.redisService.set(key, value);
        if (time) this.redisService.expire(key, time);
        return true;
    }
}