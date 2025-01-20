import { Divider } from "@arco-design/web-react";
import { IconNotification } from "@arco-design/web-react/icon";
import React from "react";

const TodoTasks: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded-md bg-white shadow p-4 mb-4">
        <div>
          <IconNotification />
          <span className="ml-1">练习</span>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div>要学习了</div>
        <div className="mt-2 flex gap-4 justify-end">
          <div className="flex flex-col justify-center items-center">
            <div>
              <span className="text-[#76e0a4] text-lg">10</span>
              <span className="ml-1 text-gray-400 text-xs">分钟</span>
            </div>
            <div className="text-gray-400 text-xs">距离开始</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <span className="text-[#fdac84] text-lg">10</span>
              <span className="ml-1 text-gray-400 text-xs">分钟</span>
            </div>
            <div className="text-gray-400 text-xs">持续时间</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTasks;
