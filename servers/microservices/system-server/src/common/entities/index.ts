import { UserEntity } from '@/modules/system/user/entities/user.entity';

/**
 * 统一导出所有实体 在TypeORM中，我们需要在ormconfig.json中配置entities字段，来指定需要加载的实体类。
 */
export default [UserEntity];
