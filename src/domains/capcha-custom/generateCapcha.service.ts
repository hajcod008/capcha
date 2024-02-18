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
  Unauthorized,
  expireTime,
} from 'src/common/translates/errors.translate';
import axios from 'axios';

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
    const { hashCap, captchaText, token } = capchaDto;

    const validate = await this.checkToken(token);

    if (!validate) {
      throw new HttpException(Unauthorized, Unauthorized.status_code);
    }
    const redisCap = await this.redisService.get(hashCap);
    this.redisService.deleteKey(hashCap);
    if (redisCap === null) {
      throw new HttpException(expireTime, expireTime.status_code);
    } else if (captchaText !== redisCap) {
      throw new HttpException(
        Bad_Request_Exception,
        Bad_Request_Exception.status_code,
      );
    } else {
      throw new HttpException(
        Request_Was_Successful1,
        Request_Was_Successful1.status_code,
      );
    }
  }

  async checkToken(token: any) {
    try {
      const data = {
        System: 'tosfood',
        Token: token,
      };
      const serviceUrl = `http://${process.env.ip}:${process.env.port}/api/get_way/check_token`;
      const response = await axios.post(serviceUrl, data);
      if (response.data.result.success) {
        console.log(response.data);
        return data;
      } else {
        throw new HttpException(Unauthorized, Unauthorized.status_code);
      }
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message || 'Internal Server Error', status);
    }
  }
}
