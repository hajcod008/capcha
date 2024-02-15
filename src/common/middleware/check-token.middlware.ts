import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import axios from 'axios';
import {
  Invalid_Token,
  Unauthorized,
  expireTime,
} from '../translates/errors.translate';
import { error } from 'console';
@Injectable()
export class checkToken implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        throw new HttpException(Invalid_Token, Invalid_Token.status_code);
      }
      const cleanToken = token.split(' ')[1];

      const data = {
        System: 'tosfood',
        Token: cleanToken,
      };
      const serviceUrl = `http://${process.env.ip}:${process.env.port}/api/get_way/check_token`;

      const response = await axios.post(serviceUrl, data);

      if (response.data.result.success) {
        console.log(response.data);
        next();
      } else {
        throw new HttpException(Unauthorized, Unauthorized.status_code);
      }
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message || 'Internal Server Error', status);
    }
  }
}
