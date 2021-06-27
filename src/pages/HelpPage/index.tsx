import React from "react";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TableOfContents from "../../components/TableOfContents";
import style from "./HelpPage.module.scss";

const HelpPage = () => {
  return (
    <div className={style.root}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <TableOfContents />
      </div>
      <div className={style.content}>
        <Content />
      </div>
    </div>
  );
};

export default HelpPage;
