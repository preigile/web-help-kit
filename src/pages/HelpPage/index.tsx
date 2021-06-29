import React from "react";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TableOfContents from "../../components/TableOfContents";
import getData from "../../hooks/getData";
import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IObject } from "../../interfaces/object";
import { IPage } from "../../interfaces/page";
import style from "./HelpPage.module.scss";

const InitialTOCState: IContent = {
  entities: {
    pages: {} as IObject<IPage>,
    anchors: {} as IObject<IAnchor>,
  },
  topLevelIds: [],
};

const HelpPage = () => {
  const {
    data: contents,
    isLoading,
    isError,
  } = getData<IContent>("/help/idea/2018.3/HelpTOC.json", []);

  return (
    <div className={style.root}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <TableOfContents
          contents={contents || InitialTOCState}
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
