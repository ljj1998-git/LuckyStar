// 从 node 中导入 内置的 path 模块
import path from "path";
const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 约定使用 @ 表示 src 文件所在目录
      // path.resolve() 该方法将一些的 路径/路径段 合并并解析为绝对路径
      // 大家也可以自定义其他的路径别名，方便开发
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          "./src/assets/css/utils.scss",
        ],
      },
    },
  ],
};
