import {
  Image,
  Radio,
  Divider,
  Tabs,
  Tag,
  Progress,
  Tree,
  Typography,
  Space,
  Card,
} from "@arco-design/web-react";
import {
  IconCalendar,
  IconList,
  IconReply,
  IconSend,
  IconStar,
  IconThumbUp,
} from "@arco-design/web-react/icon";
const TabPane = Tabs.TabPane;
const { Title, Paragraph, Text } = Typography;
import React, { useState } from "react";
import InfomationCard from "./components/InfomationCard";
import TodoTasks from "./components/TodoTasks";
import "./index.less";
import LSTitle from "@/components/LSTitle";

const TreeData = [
  {
    title: "Trunk 0-0",
    key: "0-0",
    children: [
      {
        title: "Branch 0-0-2",
        key: "0-0-2",
        selectable: false,
        children: [
          {
            title: "Leaf",
            key: "0-0-2-1",
            children: [
              {
                title: "Leafsss 0-0-2",
                key: "0-0-2-1-0",
                children: [
                  {
                    title: "Leaf",
                    key: "0-0-2-1-0-0",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Trunk 0-1",
    key: "0-1",
    children: [
      {
        title: "Branch 0-1-1",
        key: "0-1-1",
        children: [
          {
            title: "Leaf",
            key: "0-1-1-0",
          },
        ],
      },
    ],
  },
];

const Home: React.FC = () => {
  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div className="w-full h-full flex gap-4">
      <div className="flex flex-col 2xl:w-[20vw] xl:w-[15vw] h-full gap-4">
        <div className="bg-white w-full h-[124px] rounded-xl shadow-sm p-6">
          {/* <div className="flex items-center gap-1">
            <IconList className="text-lg" />
            <span className="font-bold">每日一言</span>
          </div>
          <div>失败是成功之母</div> */}
          <div className="">
            距离<span className="text-2xl text-[#4f5cf0]"> 2025年考研 </span>
            还有
            <span className="text-2xl text-[#4f5cf0]"> 100 </span>天
          </div>
        </div>
        <div className="bg-white w-full flex-1 rounded-xl shadow-sm">
          <Tabs defaultActiveTab="1">
            <TabPane key="1" title="常识" className="px-2">
              <div>
                <div className="flex items-center gap-1">
                  <IconList className="text-lg" />
                  <span className="font-bold">知识汇总</span>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag color="arcoblue">科学知识</Tag>
                    <Progress className="flex-1" percent={30} />
                    <div className="text-gray-400 text-xs flex items-center gap-1 cursor-pointer hover-gradient ">
                      <span>去学习</span>
                      <IconSend />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag color="arcoblue">地理知识</Tag>
                    <Progress className="flex-1" percent={30} />
                    <div className="text-gray-400 text-xs flex items-center gap-1 cursor-pointer hover-gradient ">
                      <span>去学习</span>
                      <IconSend />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <IconList className="text-lg" />
                  <span className="font-bold">历年真题</span>
                </div>
                <Tree
                  className="p-2"
                  defaultSelectedKeys={["0-0-1"]}
                  treeData={treeData}
                ></Tree>
              </div>
            </TabPane>
            <TabPane key="2" title="政治理论"></TabPane>
            <TabPane key="3" title="言语理解"></TabPane>
            <TabPane key="4" title="逻辑判断"></TabPane>
            <TabPane key="5" title="数量关系"></TabPane>
            <TabPane key="6" title="资料分析"></TabPane>
          </Tabs>
        </div>
      </div>
      <div className="bg-white flex-1 w-0 rounded-xl shadow-sm p-4">
        <LSTitle text="最新资讯" />
        <div className="mt-4">
          <Card
            hoverable
            style={{
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <div className="w-full h-full flex gap-4">
              <div className="w-[150px]">
                <Image
                  width={150}
                  src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                  alt="lamp"
                />
              </div>
              <div className="flex-1">
                <Typography>
                  <Title heading={4} style={{ marginTop: 0 }}>
                    这是一个资讯
                  </Title>
                  <Paragraph>
                    A design is a plan or specification for the construction of
                    an object or system or for the implementation of an activity
                    or process, or the result of that plan or specification in
                    the form of a prototype, product or process. The verb to
                    design expresses the process of developing a design.
                  </Paragraph>
                </Typography>
                <div className="flex justify-end">
                  <Space className="text-xl">
                    <Space size={2} align="center">
                      <IconThumbUp />
                      <div className="text-xs">123</div>
                    </Space>
                    <IconStar />
                    <IconReply />
                  </Space>
                </div>
              </div>
            </div>
          </Card>
        </div>
        {/* <div className="w-full rounded-md shadow-sm p-4 flex gap-4 items-start">
          
        </div> */}
      </div>
      <div className="bg-white 2xl:w-[20vw] xl:w-[15vw] rounded-xl shadow-sm p-4">
        <TodoTasks />
      </div>
    </div>
    // <div className="bg-white p-4 max-w-[1280px] mx-auto">
    //   <InfomationCard />
    //   <Divider style={{ margin: "12px 0" }} />
    //   <div className="flex mt-4 gap-4">
    //     <div className="flex-1 w-0">
    //       <div className="flex justify-between items-center">
    //         <span className="title">在线学习</span>
    //         <span className="cursor-pointer text-gray-400">
    //           更多
    //           <IconRight />
    //         </span>
    //       </div>
    //       <RadioGroup
    //         type="button"
    //         name="lang"
    //         defaultValue="Guangzhou"
    //         style={{ marginRight: 20, marginBottom: 20 }}
    //       >
    //         <Radio value="Beijing">语文</Radio>
    //         <Radio value="Shanghai">数学</Radio>
    //       </RadioGroup>
    //       <div className="">
    //         {[0, 0, 0, 0, 0, 0].map((item, index) => (
    //           <div className="w-full flex gap-4 rounded-md bg-white shadow p-4 mb-4">
    //             <div>
    //               <Image
    //                 width={100}
    //                 preview={false}
    //                 className="rounded-full mb-4"
    //                 src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    //               />
    //             </div>
    //             <div>
    //               <div>
    //                 <span>这是一个标题</span>
    //                 <span></span>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="w-[300px]">
    //       <div className="flex justify-between items-center">
    //         <span className="title">待办任务</span>
    //         <span className="cursor-pointer text-gray-400">
    //           更多
    //           <IconRight />
    //         </span>
    //       </div>
    //       <TodoTasks />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
