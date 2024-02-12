import { Controller, Get } from '@nestjs/common';
import {generateCaptchaService } from './generateCapcha.service'

@Controller('generateCaptcha')
export class generateCaptchaController {
  constructor(
     private readonly generateCaptchaService: generateCaptchaService,
  ) {}

  /*دریافت کپچا*/
  @Get('get')
  generateCaptcha() {
    return this.generateCaptchaService.generate();
  }
}