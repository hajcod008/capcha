import { Module } from '@nestjs/common';

import Redis from 'ioredis';
import { RedisDbService } from './redis.service';


@Module({
    providers: [
      {
        // connect to redis
        provide: 'REDIS_CLIENT',
        useValue: new Redis({
          host: 'localhost',
          port: 6379,
        }),
      },
      RedisDbService,
    ],
    exports: [RedisDbService]
  })
  export class RedisDbModule {}