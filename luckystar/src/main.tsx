import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.less";
import "@/styles/tailwindcss.less";
import "@arco-design/web-react/dist/css/arco.css";

import AppRoutes from "@/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
