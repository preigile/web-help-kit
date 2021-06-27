import React from "react";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TableOfContents from "../../components/TableOfContents";
import getData from "../../hooks/getData";
import style from "./HelpPage.module.scss";

const HelpPage = () => {
  const {
    data: contents,
    isLoading,
    isError,
  } = getData<any>("/help/idea/2018.3/HelpTOC.json", []);

  return (
    <div className={style.root}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <TableOfContents
          contents={contents}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <div className={style.content}>
        <Content />
      </div>
    </div>
  );
};

export default HelpPage;
