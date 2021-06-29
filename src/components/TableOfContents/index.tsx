import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IPage } from "../../interfaces/page";
import objectToMap from "../../utils/convertToMap";
import Skeleton from "../Skeleton";
import React, { useEffect, useState } from "react";
import style from "./TableOfContents.module.scss";
import TOCItem from "./TOCItem";

interface IProps {
  contents: IContent;
  isLoading: boolean;
  isError: boolean;
  activePageId?: string;
}

const ITEM_LEFT_MARGIN = 10;

const TableOfContents: React.FC<IProps> = ({
  contents,
  isLoading,
  isError,
  activePageId,
}) => {
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, IAnchor>>(new Map());
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setPages(objectToMap(contents.entities.pages));
    setAnchors(objectToMap(contents.entities.anchors));
    if (activePageId) {
      setActiveId(activePageId);
    }
  }, [activePageId, contents.entities.anchors, contents.entities.pages]);

  const setActive = (id: string) => {
    setActiveId(id);
  };

  if (isError) {
    return <div>Ups!</div>;
  }

  return (
    <div className={style.root}>
      {isLoading ? (
        <div className={style.skeletonContainer}>
          <Skeleton />
          <Skeleton />
        </div>
      ) : contents?.topLevelIds.length ? (
        <ul>
          {contents.topLevelIds.map((pageId: string) => {
            const page = pages.get(pageId);
            if (!page) {
              return <p>No such page exists</p>;
            }

            return (
              <TOCItem
                key={pageId}
                id={pageId}
                title={page.title}
                marginLeft={page.level * ITEM_LEFT_MARGIN}
                activeId={activeId}
                pagesIds={page.pages}
                anchorsIds={page.anchors}
                pages={pages}
                anchors={anchors}
                onSelectPage={(id) => setActive(id)}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TableOfContents;
