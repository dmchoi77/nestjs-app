import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base/base.exception';

export class UnCatchedException extends BaseException {
  constructor(exception: any) {
    super(
      exception.response?.message ?? 'internal server error',
      exception.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
