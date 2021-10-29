import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
export class FreeLog extends CoreEntity {
  @Column({ type: 'simple-array' })
  urls: string[];

  // 캐릭터 many to one
  // 코멘트 one to many
}
