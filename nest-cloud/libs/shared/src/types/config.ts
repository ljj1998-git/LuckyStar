export type Config = {
  MYSQL_HOST: string;
  db: {
    mysql: {
      host: string;
      name: string;
      port: number;
      username: string;
      password: string;
    };
    redis: {
      host: string;
      port: number;
      name: string;
      username: string;
      password: string;
    };
  };
  jwt: {
    /** 签名密钥 */
    secret: string;
    /** 过期时间 */
    expiration: number;
  };
  crypto: {
    /** 加密算法 */
    algorithm: string;
    /** 加密密钥 */
    secret: string;
    /** 盐 */
    salt: string;
    hex: {
      /** hex 加密密钥 */
      key: string;
      /** hex 偏移量 */
      iv: string;
    };
  };
};
