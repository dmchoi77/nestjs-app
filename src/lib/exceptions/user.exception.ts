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

export class UserPasswordCheckException extends BaseException {
  constructor() {
    super(
      '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      HttpStatus.BAD_REQUEST,
      AuthExceptionCodeEnum.InvalidPassword,
    );
  }
}
