import React, { useState } from "react";
import Content from "../../components/Content";
import Header from "../../components/Header";
import TableOfContents from "../../components/TableOfContents";
import useData from "../../hooks/useData";
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
  } = useData<IContent>("/help/idea/2018.3/HelpTOC.json", []);

  const [activeId, setActiveId] = useState<string>("top");

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
          activePageId={activeId}
          onActiveIdUpdate={setActiveId}
        />
      </div>
      <div className={style.content}>
        <Content />
      </div>
    </div>
  );
};

export default HelpPage;
