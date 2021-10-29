import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findById(decoded.id);
          if (user) req['user'] = user;
        }
      } catch (error) {
        return { ok: false };
      }
    }
    next();
  }
}
