import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';
import { AuthExceptionCodeEnum } from '../enum/exception.enum';

export class UserNotFoundException extends BaseException {
  constructor() {
    super(
      '이메일과 비밀번호가 일치하지 않습니다.',
      HttpStatus.NOT_FOUND,
      AuthExceptionCodeEnum.UserNotFound,
    );
  }
}

export class UserExistsException extends BaseException {
  constructor() {
    super(
      '이미 존재하는 이메일입니다.',
      HttpStatus.FORBIDDEN,
      AuthExceptionCodeEnum.UserExists,
    );
  }
}
