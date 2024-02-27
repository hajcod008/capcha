import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createCanvas, registerFont } from 'canvas';
import * as randomstring from 'randomstring';

import * as dotenv from 'dotenv';
dotenv.config();
import * as uuid from 'uuid';
import { RedisDbService } from 'src/common/redis/redis.service';
import {
  Request_Was_Successful,
  Request_Was_Successful1,
} from 'src/common/translates/success.translate';
import {
  Bad_Request_Exception,
  InternalServerError,
  Invalid_Captcha,
  Unauthorized,
  expireTime,
} from 'src/common/translates/errors.translate';

let hashCap: string;

@Injectable()
export class generateCaptchaService {
  constructor(private redisService: RedisDbService) {}
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

      const captchaText = randomstring.generate(process.env.RANDOM_NUMBER);
      hashCap = uuid.v4();
      console.log('hash', hashCap);
      this.redisService.set(
        hashCap,
        captchaText,
        parseInt(process.env.EXP_CAP),
      );

      ctx.fillText(captchaText, 17, 70);
      console.log('captcha', captchaText);

      canvas.toBuffer('image/png');

      const additional_info = {
        hashCap,
        captchaText,
      };
      const result = Request_Was_Successful(additional_info);

      throw new HttpException(result, result.status_code);
    } catch (error) {
      throw new HttpException(
        {
          ...error.response,
          additional_info: {
            ...error.response.message,
            hashCap: error.response.hashCap,
            captchaText: error.response.captchaText,
          },
        },
        error.status,
      );
    }
  }

  async validateCaptcha(capchaDto: any): Promise<any> {
    try {
      const { hashCap, captchaText } = capchaDto;

      const redisCap = await this.redisService.get(hashCap);

      this.redisService.deleteKey(hashCap);
      if (redisCap === null) {
        throw new HttpException(expireTime, expireTime.status_code);
      } else if (captchaText !== redisCap) {
        throw new HttpException(Invalid_Captcha, Invalid_Captcha.status_code);
      } else {
        throw new HttpException(
          Request_Was_Successful1,
          Request_Was_Successful1.status_code,
        );
      }
    } catch (error) {
      if (error.status === undefined) {
        const formatError = InternalServerError(error.message);
        throw new HttpException(formatError, formatError.status_code);
      } else throw error;
    }
  }
}
