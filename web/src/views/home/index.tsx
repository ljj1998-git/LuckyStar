import {
  ClockCircleOutlined,
  ContainerOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  message,
  Select,
  SelectProps,
  Space,
  Tag,
  Timeline,
  Upload,
  UploadProps,
} from "antd";
import styles from "./index.module.scss";
import { useState } from "react";
import Title from "antd/es/typography/Title";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.left}>
        <div className={styles.times}>
          <Flex vertical={true} gap={24}>
            <Space>
              <span className={styles.title}>单位</span>
            </Space>
            <Timeline
              items={[
                {
                  children: (
                    <div style={{ width: "100%" }}>
                      计算机二级 2015-09-01 剩余: &nbsp;
                      <Tag color="blue">20天</Tag>
                    </div>
                  ),
                },
                {
                  children: "计算机二级 2015-09-01",
                },
              ]}
            />
          </Flex>
        </div>
      </div>
      <div className={styles.middle}></div>
      <div className={styles.right}>
        <div>
          <Space>
            <span className={styles.title}>常用工具</span>
          </Space>
          <div>
            <div>
              <div className="my-1">
                <Tag color="blue">语文</Tag>
              </div>
              <Space wrap={true} size={4}>
                <Tag>计算器</Tag>
                <Tag>计算器</Tag>
              </Space>
            </div>
            <div>
              <div className="my-1">
                <Tag color="blue">数学</Tag>
              </div>
              <Space wrap={true} size={4}>
                <Tag>计算器</Tag>
              </Space>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Space>
            <span className={styles.title}>常用资料</span>
          </Space>
        </div>
      </div>
    </div>
  );
}
