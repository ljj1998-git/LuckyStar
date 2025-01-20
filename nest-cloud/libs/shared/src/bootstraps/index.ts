import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

/** 数据库配置 */
const initDBConfig = () => {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const host = configService.get('MYSQL_HOST');
      const port = configService.get('MYSQL_PORT');
      const username = configService.get('MYSQL_USER');
      const password = configService.get('MYSQL_PASSWORD');
      const database = configService.get('MYSQL_DATABASE');
      return {
        type: 'mysql',
        host: host,
        port: port,
        username: username,
        password: password,
        database: database,
        entities: entities,
        // 仅在开发中使用，生产环境请设置为 false
        synchronize: true,
        dateStrings: true,
        logging: true,
      };
    },
    inject: [ConfigService],
  });
};

// 使用函数来导出，因为 ConfigModule 中有一个load方法，需要导入一个函数
export default [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.development',
  }),
  initDBConfig(),
];
