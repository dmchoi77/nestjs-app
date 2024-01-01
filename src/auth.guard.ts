import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('JWT 토큰이 없습니다.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = this.authService.verify(token);
      request.user = decodedToken.userId;

      // return this.validateRequest(request);
      return true;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 JWT 토큰입니다.');
    }
  }

  // validateRequest(request: Request) {
  //   const jwtString = request.headers.authorization.split('Bearer ')[1];
  //   this.authService.verify(jwtString);

  //   return true;
  // }
}
