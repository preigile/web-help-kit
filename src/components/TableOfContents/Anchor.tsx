import cn from "classnames";
import React from "react";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  leftIndent: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const Anchor: React.FC<IProps> = ({
  id,
  title,
  leftIndent,
  isActive,
  onSelect,
}) => {
  const clickHandler = (id: string) => {
    onSelect(id);
  };

  return (
    <div
      className={cn(style.root, style.anchorLink, {
        [style.activeAnchor]: isActive,
      })}
      style={{ paddingLeft: leftIndent }}
      onClick={() => clickHandler(id)}
    >
      <span className={cn(style.title, style.anchorTitle)}>{title}</span>
    </div>
  );
};

export default Anchor;
