import { Module } from '@nestjs/common';
import { RedisDbModule } from 'src/common/redis.module';
import { generateCaptchaController } from './generateCapcha.controller';
import { generateCaptchaService } from './generateCapcha.service';


@Module({
    imports:[RedisDbModule],
    controllers: [generateCaptchaController],
    providers: [generateCaptchaService],
  })
  export class GeneratecaptchaModule {}