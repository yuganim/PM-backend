import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

export class LoginInput extends PickType(User, ['userId', 'password']) {}
export class LoginOutput extends CoreOutput {
  token?: string;
}
