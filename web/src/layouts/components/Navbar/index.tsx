import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  Avatar,
  Input,
  MenuProps,
  Select,
  SelectProps,
  Space,
  Image,
} from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Menu from "./components/Menu";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    label: "首页",
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: "工具",
    key: "app",
    icon: <AppstoreOutlined />,
  },
];

const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const [data, setData] = useState<SelectProps["options"]>([
    { value: "beijing", label: "北京市" },
    { value: "tianjin", label: "天津市" },
    { value: "shanghai", label: "上海市" },
    { value: "chongqing", label: "重庆市" },
    { value: "hebei", label: "河北省" },
    { value: "shanxi", label: "山西省" },
    { value: "neimenggu", label: "内蒙古自治区" },
    { value: "liaoning", label: "辽宁省" },
    { value: "jilin", label: "吉林省" },
    { value: "heilongjiang", label: "黑龙江省" },
    { value: "jiangsu", label: "江苏省" },
    { value: "zhejiang", label: "浙江省" },
    { value: "anhui", label: "安徽省" },
    { value: "fujian", label: "福建省" },
    { value: "jiangxi", label: "江西省" },
    { value: "shandong", label: "山东省" },
    { value: "henan", label: "河南省" },
    { value: "hubei", label: "湖北省" },
    { value: "hunan", label: "湖南省" },
    { value: "guangdong", label: "广东省" },
    { value: "guangxi", label: "广西壮族自治区" },
    { value: "hainan", label: "海南省" },
    { value: "chongqing", label: "重庆市" },
    { value: "sichuan", label: "四川省" },
    { value: "guizhou", label: "贵州省" },
    { value: "yunnan", label: "云南省" },
    { value: "xz", label: "西藏自治区" },
    { value: "shanxi2", label: "陕西省" },
    { value: "gansu", label: "甘肃省" },
    { value: "qinghai", label: "青海省" },
    { value: "ningxia", label: "宁夏回族自治区" },
    { value: "xinjiang", label: "新疆维吾尔自治区" },
  ]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    // fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={data}
    />
  );
};

import Logo from "@/assets/images/logo.svg";

const Navbar: React.FC = () => {
  return (
    <div className={styles.content}>
      <Image width={200} src={Logo} height={64} preview={false} />
      <div className={styles.right}>
        <Menu />
        <div className={styles.btns}>
          <Space>
            <SearchInput placeholder="选择类型" style={{ width: 100 }} />
            <SearchInput placeholder="选择城市" style={{ width: 100 }} />
          </Space>
          <Input
            placeholder="搜索资料"
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <div>
            <div className={styles.avatar}>
              <Avatar shape="square" icon={<UserOutlined />} />
              <span>登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
