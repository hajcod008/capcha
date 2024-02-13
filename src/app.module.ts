import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisDbModule } from './common/redis/redis.module';
import { GeneratecaptchaModule } from './domains/capcha-custom/generateCapcha.module';
import { Connection } from 'typeorm';
import { checkToken } from './common/middleware/check-token.middlware';


@Module({
  imports: [RedisDbModule,GeneratecaptchaModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule implements NestModule{
 // constructor(private connection: Connection){}
  configure(consumer: MiddlewareConsumer, ) {
    consumer
      .apply(checkToken)
      .forRoutes({ path: '*', method: RequestMethod.ALL });}
}
