import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { WinstonModule } from 'nest-winston';
// import winstonLogger from '@/config/modules/winstonLogger';
import entities from '@/common/entities/index';
import { join } from 'path';
import { Config } from '@/types/config';

const configYmalPath = join(__dirname, 'config.yaml');
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
    entities: entities,
    // 仅在开发中使用，生产环境请设置为 false
    synchronize: true,
    dateStrings: true,
    logging: true,
  });
};

// /** 日志配置 */
// const createLogger = () => {
//   return WinstonModule.forRoot({
//     transports: winstonLogger.transports,
//     format: winstonLogger.format,
//     defaultMeta: winstonLogger.defaultMeta,
//     exitOnError: false, // 防止意外退出
//   });
// };

// 使用函数来导出，因为 ConfigModule 中有一个load方法，需要导入一个函数
export default [
  initConfig(),
  initDBConfig(),
  // createLogger()
];
