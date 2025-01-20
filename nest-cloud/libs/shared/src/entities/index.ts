import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';
import { MenuEntity } from './menu.entity';
import { RoleEntity } from './role.entity';
import { SubjectEntity } from './subject.entity';

/**
 * 统一导出所有实体 在TypeORM中，我们需要在ormconfig.json中配置entities字段，来指定需要加载的实体类。
 */
export default [
  UserEntity,
  DepartmentEntity,
  RoleEntity,
  MenuEntity,
  SubjectEntity,
];
