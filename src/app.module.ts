import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisDbModule } from './common/redis.module';
import { GeneratecaptchaModule } from './command/generateCapcha.module';

@Module({
  imports: [RedisDbModule,GeneratecaptchaModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
