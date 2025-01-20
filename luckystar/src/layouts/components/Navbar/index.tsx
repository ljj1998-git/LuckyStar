import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Image, Menu, Space } from "@arco-design/web-react";
import { IconSend, IconUser } from "@arco-design/web-react/icon";
const MenuItem = Menu.Item;
import Logo from "@/assets/images/logo.svg";

const dropList = (
  <Menu>
    <Menu.Item key="1">Beijing</Menu.Item>
    <Menu.Item key="2">Shanghai</Menu.Item>
    <Menu.Item key="3">Guangzhou</Menu.Item>
  </Menu>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const clickMenu = (key: string) => {
    navigate(key);
  };

  return (
    <div className="h-[60px] w-full bg-white flex items-center px-8 shadow-md">
      <div>
        <Image width={170} height={60} src={Logo} preview={false} />
      </div>
      <div className="flex-1 w-0">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClickMenuItem={clickMenu}
        >
          <MenuItem key="/">首页</MenuItem>
          <MenuItem key="/topic">题库</MenuItem>
        </Menu>
      </div>
      <div className="flex items-center gap-4">
        <Space>
          <Dropdown droplist={dropList} position="bl">
            <div className="bg-blue-600 text-white rounded-md  cursor-pointer px-4 py-2 text-sm font-bold ">
              <IconSend />
              <span className="ml-2">2024计算机二级考试</span>
            </div>
          </Dropdown>

          {/* <div className="bg-white rounded-md cursor-pointer px-4 py-2 text-sm font-bold ">
            2024计算机二级考试
          </div> */}
        </Space>
        <div>
          <Avatar size={30} style={{ backgroundColor: "#3370ff" }}>
            <IconUser />
          </Avatar>
          <span className="ml-2">登录</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
