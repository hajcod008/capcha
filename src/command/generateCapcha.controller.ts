import { Body, Controller, Get, Post } from '@nestjs/common';
import {generateCaptchaService } from './generateCapcha.service'
import { CapchaDto, capchaResponseDto } from './dto/capchaDto';

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

  @Post('checkCapcha')
   async checkCapcha(@Body() capchaDto: CapchaDto ): Promise<capchaResponseDto>{
  const result =  await this.generateCaptchaService.validateCapcha(capchaDto);
  return result as capchaResponseDto;
  }
}