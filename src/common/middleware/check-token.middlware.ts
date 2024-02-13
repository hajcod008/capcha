import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import axios from 'axios';
import { Invalid_Token } from '../translates/errors.translate';
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
        throw new HttpException(Invalid_Token, Invalid_Token.status_code);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ETIMEDOUT') {
        throw new HttpException('Request timeout', HttpStatus.REQUEST_TIMEOUT);
      } else {
        console.error('Error in CheckToken middleware:', error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}