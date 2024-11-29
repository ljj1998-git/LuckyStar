import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn() // 自动生成创建日期
  createdAt: Date;

  // 创建人
  @Column()
  createdBy: string;

  @UpdateDateColumn() // 自动生成更新时间
  updatedAt: Date;

  // 更新人
  @Column()
  updatedBy: string;

  // 软删除
  @Column()
  isDeleted: number;
}
