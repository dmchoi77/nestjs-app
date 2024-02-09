import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
export class CreateUserDto {
  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
      throw new BadRequestException(
        '패스워드는 name과 같은 문자열을 포함할 수 없습니다.',
      );
    }
    return value.trim();
  })
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/, {
    message: '비밀번호는 8자 이상 30자 이하여야 합니다.',
  })
  readonly password: string;
}
