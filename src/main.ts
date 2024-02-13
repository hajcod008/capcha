import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret:process.env.SESSION_SECRET , 
    resave: false,
    saveUninitialized: false  
  }));
  app.enableCors();
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = process.env.SERVER_PORT;
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  console.log(`The server listens on port ${port}`);
}
bootstrap();