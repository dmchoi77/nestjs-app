import * as uuid from 'uuid';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import {
  UserExistsException,
  UserNotFoundException,
  UserPasswordCheckException,
} from '../lib/exceptions/user.exception';

@Injectable()
export class UsersService {
  // 1. DB에서 signupVerifyToken으로 회원 가입 처리 중인 유저가 있는지 조회하고 없다면 에러 처리
  // 2. 바로 로그인 상태가 되도록 JWT 발급

  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    passwordCheck: string,
  ) {
    const userExist = await this.checkUserExists(email);

    if (userExist) throw new UserExistsException();

    if (password !== passwordCheck) throw new UserPasswordCheckException();

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    return !!user;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = uuid.v4();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      // await this.usersRepository.save(user);
      await manager.save(user);

      // throw new InternalServerErrorException();
    });
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string) {
    const user = await this.usersRepository.findOne({
      where: { signupVerifyToken },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });

    // if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');
    if (!user) throw new UserNotFoundException();

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
