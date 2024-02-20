import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {generateCaptchaService } from './generateCapcha.service'
import { CapchaDto, capchaResponseDto } from './dto/capchaDto';
import { CheckTokenGuard } from 'src/common/guard/get-token.guard';

@Controller('generateCaptcha')
export class generateCaptchaController {
  constructor(
     private readonly generateCaptchaService: generateCaptchaService,
  ) {}

  /*دریافت کپچا*/
  @UseGuards(CheckTokenGuard) 
  @Get('get')
  generateCaptcha() {
    return this.generateCaptchaService.generate();
  }

  
  @UseGuards(CheckTokenGuard)
  @Post('checkCapcha')
   async checkCapcha(@Body() capchaDto: CapchaDto ): Promise<capchaResponseDto>{
  const result =  await this.generateCaptchaService.validateCaptcha(capchaDto);
  return result as capchaResponseDto;
  }
}