import { HttpException } from '@nestjs/common';
import { IBaseException } from '../../interfaces/base.exception.interface';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorMessage: string, statusCode: number, errorCode?: string) {
    super(errorCode, statusCode);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  errorMessage: string;

  statusCode: number;

  errorCode?: string;
}
