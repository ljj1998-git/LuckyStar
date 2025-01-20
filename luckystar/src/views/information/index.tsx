import React from "react";
import { Radio, Tag } from "@arco-design/web-react";
import { IconList, IconRight } from "@arco-design/web-react/icon";
const RadioGroup = Radio.Group;

const Information: React.FC = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <div className="bg-white p-4 w-[20vw] rounded-xl flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <IconList className="text-lg" />
          <span className="font-bold">题型分类</span>
        </div>
        <div className="flex gap-2">
          <Tag color="arcoblue" checkable>资料分析</Tag>
          <Tag checkable>言语理解</Tag>
        </div>
      </div>
      <div className="bg-white p-4 flex-1 w-0 rounded-xl"></div>
    </div>
  );
};

export default Information;
