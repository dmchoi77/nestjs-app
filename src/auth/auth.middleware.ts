import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

interface AuthenticatedRequest extends Request {
  user?: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('JWT 토큰이 없습니다.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = this.authService.verify(token);
      req.user = decodedToken.userId;
      next();
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 JWT 토큰입니다.');
    }
  }
}
