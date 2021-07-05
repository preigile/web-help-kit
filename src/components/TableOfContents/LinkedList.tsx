import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import style from "./LinkedList.module.scss";

interface IProps {
  id: string;
  title: string;
  url: string;
  leftIndent: number;
  isActive: boolean;
  isActiveGroup: boolean;
  clickHandler: () => void;
  keyDownHandler: (event: React.KeyboardEvent<HTMLElement>) => void;
}

const LinkedList: React.FC<IProps> = ({
  children,
  id,
  url,
  leftIndent,
  isActive,
  isActiveGroup,
  clickHandler,
  keyDownHandler,
}) => {
  return (
    <li
      className={cn(style.root, {
        [style.active]: isActive,
        [style.activeGroup]: isActiveGroup,
      })}
      id={id}
    >
      <Link
        to={url}
        className={style.link}
        style={{ paddingLeft: leftIndent }}
        onClick={clickHandler}
        tabIndex={0}
        onKeyDown={keyDownHandler}
      >
        {children}
      </Link>
    </li>
  );
};

export default LinkedList;
