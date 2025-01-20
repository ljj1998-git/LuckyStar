import React from "react";
import { Radio } from "@arco-design/web-react";
import { IconRight } from "@arco-design/web-react/icon";
const RadioGroup = Radio.Group;

const Topic: React.FC = () => {
  return (
    <div className="bg-white p-4 max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center">
        <span className="title">在线题库</span>
        <span className="cursor-pointer text-gray-400">
          更多
          <IconRight />
        </span>
      </div>
      <RadioGroup
        type="button"
        name="lang"
        defaultValue="Guangzhou"
        style={{ marginRight: 20, marginBottom: 20 }}
      >
        <Radio value="Beijing">语文</Radio>
        <Radio value="Shanghai">数学</Radio>
      </RadioGroup>
      <div className=""></div>
    </div>
  );
};

export default Topic;
