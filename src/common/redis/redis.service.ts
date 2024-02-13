import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisDbService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  // A set function for storing values with their keys in Redis
  async set(key: string, value: any, ex: number) {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ex);
  }

  // Get values using keys from Redis
  async get(key: string) {
    const data = await this.redisClient.get(key);
    return JSON.parse(data);
  }

  // Remove a specific key from Redis
  async deleteKey(key: string) {
    this.redisClient.del(key);
  }
}
