import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}
  sign(payload): string {
    return jwt.sign(payload, this.config.get('PRIVATE_KEY'));
  }
  verify(token: string) {
    return jwt.verify(token, this.config.get('PRIVATE_KEY'));
  }
}
