import { BeforeInsert, Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends CoreEntity {
  @Column()
  userId: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(pw): Promise<boolean> {
    return await bcrypt.compare(pw, this.password);
  }
}
