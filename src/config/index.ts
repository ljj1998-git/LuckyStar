import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { TypeOrmModule } from '@nestjs/typeorm';

type Config = {
  db: {
    mysql: {
      host: string;
      name: string;
      port: number;
      username: string;
      password: string;
    };
  };
};

const configYmalPath = 'src/config/config.yaml';
const config: Config = yaml.load(readFileSync(configYmalPath, 'utf8'));
/** 导入config.yaml配置文件  */
const initConfig = () => {
  const configYmal = () => {
    return config;
  };
  return ConfigModule.forRoot({
    isGlobal: true,
    load: [configYmal],
  });
};

/** 数据库配置 */
const initDBConfig = () => {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.db.mysql.host,
    port: config.db.mysql.port,
    username: config.db.mysql.username,
    password: config.db.mysql.password,
    database: config.db.mysql.name,
    entities: [],
    synchronize: true,
  });
};

// 使用函数来导出，因为 ConfigModule 中有一个load方法，需要导入一个函数
export default [initConfig(), initDBConfig()];
