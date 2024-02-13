import { Module } from '@nestjs/common';

import { generateCaptchaController } from './generateCapcha.controller';
import { generateCaptchaService } from './generateCapcha.service';
import { RedisDbModule } from 'src/common/redis/redis.module';


@Module({
    imports:[RedisDbModule],
    controllers: [generateCaptchaController],
    providers: [generateCaptchaService],
  })
  export class GeneratecaptchaModule {}