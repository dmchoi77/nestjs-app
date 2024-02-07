import { HttpException } from '@nestjs/common';
import { IBaseException } from '../../interfaces/base.exception.interface';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, errorMessage: string, statusCode: number) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
  errorCode: string;

  errorMessage: string;

  statusCode: number;
}
