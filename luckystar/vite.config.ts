import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom", "react-i18next"],
      dts: "types/auto-import.d.ts",
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
      },
    },
  },
  // 路由别名
  resolve: {
    alias: {
      "@": "D:/study/LuckyStar/luckystar/src",
    },
  },
});
