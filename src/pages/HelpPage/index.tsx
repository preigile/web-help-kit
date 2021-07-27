import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Content from "../../components/Content";
import Header from "../../components/Header";
import TableOfContents from "../../components/TableOfContents";
import { withError } from "../../hoc/withError";
import { withLoading } from "../../hoc/withLoading";
import useData from "../../hooks/useData";
import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IObject } from "../../interfaces/object";
import { IPage } from "../../interfaces/page";
import plug from "../../mocks/HelpTOC.json";
import style from "./HelpPage.module.scss";

const InitialTOCState: IContent = {
  entities: {
    pages: {} as IObject<IPage>,
    anchors: {} as IObject<IAnchor>,
  },
  topLevelIds: [],
};

const TableOfContentsWithLoading = withLoading(withError(TableOfContents));

const HelpPage = () => {
  const {
    data: contents,
    isLoading,
    isError,
  } = useData<IContent>("/help/idea/2018.3/HelpTOC.json", plug, []);
  const history = useHistory();
  const location = useLocation();

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setActiveId(getIdFromUrl() || "top");
  }, []);

  useEffect(() => {
    history.push(activeId);
  }, [activeId]);

  const getIdFromUrl = (): string => {
    const text = location.pathname.substring(1) + location.hash;
    return decodeURI(text);
  };

  return (
    <div className={style.root}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <TableOfContentsWithLoading
          contents={contents || InitialTOCState}
          isLoading={isLoading}
          isError={isError && !contents}
          activeId={activeId}
          onActiveIdUpdate={setActiveId}
        />
      </div>
      <div className={style.content}>
        <Content activeId={activeId} />
      </div>
    </div>
  );
};

export default HelpPage;
