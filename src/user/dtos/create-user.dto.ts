import { CoreOutput } from '../../common/dtos/output.dto';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserInput extends PickType(User, [
  'userId',
  'username',
  'password',
]) {}
export class CreateUserOutput extends CoreOutput {}
