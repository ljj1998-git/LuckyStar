import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  // 自动生成创建日期
  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // 创建人
  @Column()
  createdBy: string;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  }) // 自动生成更新时间
  updatedAt: Date;

  // 更新人
  @Column()
  updatedBy: string;

  // 软删除
  @Column()
  isDeleted: number;
}
