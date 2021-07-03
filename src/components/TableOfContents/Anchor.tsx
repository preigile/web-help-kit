import React from "react";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  leftIndent: number;
  onSelect: (id: string) => void;
}

const Anchor: React.FC<IProps> = ({ id, title, leftIndent, onSelect }) => {
  const clickHandler = (id: string) => {
    onSelect(id);
  };

  return (
    <div
      className={style.anchorLink}
      style={{ paddingLeft: leftIndent }}
      onClick={() => clickHandler(id)}
    >
      <div className={style.title}>{title}</div>
    </div>
  );
};

export default Anchor;
