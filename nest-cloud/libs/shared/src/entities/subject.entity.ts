import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './common.entity';

@Entity('portal_subjects')
export class SubjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '科目id',
  })
  id: number;

  @Column({
    comment: '科目类型 1:科目 2:题型',
  })
  type: number;

  @Column({
    comment: '上级科目id',
    nullable: true,
  })
  parentId?: number;

  @Column({
    comment: '名称',
  })
  name: string;

  @Column({
    comment: '菜单图标',
    nullable: true,
  })
  icon?: string;

  @Column({
    comment: '排序',
    nullable: true,
  })
  sort?: number;

  @Column({
    comment: '状态 1:启用 0:禁用',
  })
  status: number;
}
