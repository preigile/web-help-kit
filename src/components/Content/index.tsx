import React from "react";
import Footer from "../Footer";
import style from "./Content.module.scss";

interface IProps {
  activeId: string;
}

const Content: React.FC<IProps> = ({ activeId }) => {
  return (
    <div className={style.root}>
      <div className={style.content}>{activeId}</div>
      <Footer />
    </div>
  );
};

export default Content;
