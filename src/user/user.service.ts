import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser({
    userId,
    username,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exists =
        (await this.users.findOne({ userId })) ||
        (await this.users.findOne({ username }));
      if (exists) {
        return {
          ok: false,
          error: 'Error: 이미 존재하는 아이디 혹은 닉네임입니다.',
        };
      }
      await this.users.save(this.users.create({ userId, username, password }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
  async login({ userId, password }: LoginInput) {
    try {
      // 정보체크
      const user = await this.users.findOne(
        { userId },
        { select: ['id', 'password'] },
      );

      if (!user || !(await user.checkPassword(password))) {
        return { ok: false, error: 'Error: 올바르지 않은 로그인 정보입니다.' };
      }
      // JwtToken 생성

      const token = this.jwtService.sign({ id: user.id });

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error: error };
    }
  }
  findById(id) {
    return this.users.findOne({ id });
  }
}
