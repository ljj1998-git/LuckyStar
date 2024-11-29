import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './common.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  mobile: string;
}
