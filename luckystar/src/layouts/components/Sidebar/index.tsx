import React, { useState } from "react";
import "./index.less";

import Logo from "@/assets/images/logo.svg";
import { IconHome } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>("");

  const handleClick = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  return (
    <div className="w-[5vw] h-full bg-[#4F5CF0] py-8">
      <div className="shell">
        <ul className="nav">
          <li
            className={
              (activeKey == "/" ? "active" : "") + " flex flex-col items-center"
            }
            onClick={() => handleClick("/")}
          >
            <IconHome />
            <div className="text font-zhuhai">首页</div>
          </li>
          <li
            className={
              (activeKey == "infomation" ? "active" : "") +
              " flex flex-col items-center"
            }
            onClick={() => handleClick("infomation")}
          >
            <IconHome />
            <div className="text font-zhuhai">资料</div>
          </li>
          <li
            className={
              (activeKey == "topic" ? "active" : "") +
              " flex flex-col items-center"
            }
            onClick={() => handleClick("topic")}
          >
            <IconHome />
            <div className="text font-zhuhai">题库</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
