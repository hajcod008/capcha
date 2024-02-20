import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Invalid_Token, Unauthorized } from '../translates/errors.translate';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers['authorization'];

      if (!token) {
        throw new HttpException(Invalid_Token, HttpStatus.UNAUTHORIZED);
      }
      const cleanToken = token.split(' ')[1];

      const data = {
        System: process.env.NAME_GET_WAY,
        Token: cleanToken,
      };
      const serviceUrl = `http://${process.env.ip}:${process.env.port}/api/get_way/check_token`;

      const response = await axios.post(serviceUrl, data);

      if (response.data.result.success) {
        console.log(response.data);
        return true;
      } else {
        throw new HttpException(Unauthorized, HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      if (error.response && error.response.status) {
        throw new HttpException(error.response.data.message, error.response.data.result.status_code);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}