import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput } from './dtos/login.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async createUser(
    @Body() createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return await this.userService.createUser(createUserInput);
  }
  @Post('login')
  login(@Body() loginInput: LoginInput) {
    return this.userService.login(loginInput);
  }
  // info
  @Get('my-info')
  getMyInfo(@AuthUser() user: User) {
    return user;
  }
  @Get('info/:id')
  getUserInfo(@Param('id') id: number) {
    return { ok: true, user: this.userService.findById(id) };
  }
}
