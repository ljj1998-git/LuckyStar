import { Space } from "@arco-design/web-react";
import { IconPlus, IconSend } from "@arco-design/web-react/icon";
import React from "react";

const InfomationCard: React.FC = () => {
  return (
    <div>
      {/* <div className="flex items-center text-blue-600">
        <Space>
          <div className="bg-blue-600 text-white rounded-md  cursor-pointer px-4 py-2 text-sm font-bold ">
            <IconSend />
            <span className="ml-2">2024计算机二级考试</span>
          </div>
          <div className="bg-white rounded-md cursor-pointer px-4 py-2 text-sm font-bold ">
            2024计算机二级考试
          </div>
        </Space>
        <IconPlus />
      </div> */}
      <div className="flex gap-4 w-full">
        <div className="w-1/5 h-20 rounded-md bg-gradient-to-tl from-[#bce2f4] to-[#629ff1] p-2 box-border">
          <div className=" text-white text-lg font-bold">快速练习</div>
          <span className=" text-white text-xs">quick practice</span>
        </div>
        <div className="w-1/5 h-20 rounded-md bg-gradient-to-tl from-[#fdb480] to-[#fc7e9c] p-2 box-border">
          <div className=" text-white text-lg font-bold">快速练习</div>
          <span className=" text-white text-xs">quick practice</span>
        </div>
        <div className="w-1/5 h-20 rounded-md bg-gradient-to-tl from-[#45e3a5] to-[#34c9b5] p-2 box-border">
          <div className=" text-white text-lg font-bold">快速练习</div>
          <span className=" text-white text-xs">quick practice</span>
        </div>
        <div className="w-1/5 h-20 rounded-md bg-gradient-to-tl from-[#bd73d8] to-[#7e72ce] p-2 box-border">
          <div className=" text-white text-lg font-bold">快速练习</div>
          <span className=" text-white text-xs">quick practice</span>
        </div>
        <div className="w-1/5 h-20 rounded-md bg-gradient-to-tl from-[#bce2f4] to-[#629ff1] p-2 box-border">
          <div className=" text-white text-lg font-bold">快速练习</div>
          <span className=" text-white text-xs">quick practice</span>
        </div>
      </div>
    </div>
  );
};

export default InfomationCard;
