import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  generateAccessToken(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, this.config.jwtAccessTokenSecret, {
      expiresIn: this.config.jwtAccessTokenExpirationTime,
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  generateRefreshToken(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, this.config.jwtRefreshTokenSecret, {
      expiresIn: this.config.jwtRefreshTokenExpirationTime,
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(
        jwtString,
        this.config.jwtAccessTokenSecret,
      ) as (jwt.JwtPayload | string) & User;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
