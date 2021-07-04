import React from "react";
import { Link } from "react-router-dom";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  url: string;
  anchor: string;
  leftIndent: number;
  onSelect: (id: string) => void;
}

const Anchor: React.FC<IProps> = ({
  id,
  title,
  url,
  anchor,
  leftIndent,
  onSelect,
}) => {
  const clickHandler = (id: string) => {
    onSelect(id);
  };

  return (
    <Link
      to={`/${url}${anchor}?id:${id}`}
      className={style.anchorLink}
      style={{ paddingLeft: leftIndent }}
      onClick={() => clickHandler(id)}
    >
      <div className={style.title}>{title}</div>
    </Link>
  );
};

export default Anchor;
