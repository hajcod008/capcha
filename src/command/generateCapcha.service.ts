import { Injectable } from '@nestjs/common';
import { createCanvas, registerFont } from 'canvas';
import * as randomstring from 'randomstring';

import * as dotenv from 'dotenv';
dotenv.config();
import * as uuid from 'uuid';
import { RedisDbService } from 'src/common/redis.service';

let hashCap: string;

@Injectable()
export class generateCaptchaService {
  constructor(private redisService: RedisDbService,) {}
  async generate() {
    try {
      registerFont(process.env.font_url, {
        family: 'My Font',
      });
      // Create a canvas
      const canvas = createCanvas(250, 100);
      const ctx = canvas.getContext('2d');
      
      // Set background color
      ctx.fillStyle = `rgb(255, 255, 255, 1)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text color and font
      ctx.fillStyle = `rgb(255, 0, 255, 0.5)`;
      ctx.font = '50px "My Font"';
      
      const captchaText = randomstring.generate(6);
      hashCap = uuid.v4();
      console.log('hash', hashCap);
      this.redisService.set(
        hashCap,
        captchaText,
        parseInt(process.env.EXP_CAP),
        );
    
        ctx.fillText(captchaText, 17, 70);
        console.log('captcha', captchaText);

      
      const buffer = canvas.toBuffer('image/png');

      return buffer;
    } catch (error) {
      console.log(error);
    }
  }
}
