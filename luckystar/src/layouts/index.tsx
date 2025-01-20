import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import BreadcrumbComponent from "./components/Breadcrumb";
import { Affix, BackTop } from "@arco-design/web-react";
import LSToolbar from "@/components/LSToolbar";
import Sidebar from "./components/Sidebar";

const IndexLayout: React.FC = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <Sidebar />
      <div className="p-4  w-full h-full flex flex-col gap-4">
        <BreadcrumbComponent />
        <div className="flex-1 h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;
