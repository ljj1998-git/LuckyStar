import { IconDragDotVertical } from "@arco-design/web-react/icon";
import React from "react";

interface IProps {
  text: string;
}

const LSTitle: React.FC<IProps> = (props) => {
  return (
    <div className="flex items-center gap-1">
      <IconDragDotVertical className="text-lg" />
      <span className="font-bold">{props.text}</span>
    </div>
  );
};

export default LSTitle;
