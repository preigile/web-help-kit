import React from "react";

interface IProps {
  id: string;
  title: string;
  marginLeft: number;
  isActive: boolean;
  isOpen: boolean;
  pages?: string[];
  anchors?: string[];
}

const TOCItem: React.FC<IProps> = ({
  id,
  title,
  marginLeft,
  isActive,
  isOpen,
  pages,
  anchors,
}) => {
  return <div>{title}</div>;
};

export default TOCItem;
