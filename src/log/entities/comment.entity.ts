import { Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
export class Comment extends CoreEntity {
  // 내용
  // 작성자(캐릭터) many to one
}
