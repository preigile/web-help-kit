import { PagesContext } from "../../context/PagesContext";
import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IPage } from "../../interfaces/page";
import objectToMap from "../../utils/convertToMap";
import React, { useEffect, useState } from "react";
import style from "./TableOfContents.module.scss";
import TOCItem from "./TOCItem";
import { AnchorsContext } from "context/AnchorsContext";

interface IProps {
  contents: IContent;
  activePageId: string;
  onActiveIdUpdate: (id: string) => void;
}

const ITEM_LEFT_MARGIN = 10;

const TableOfContents: React.FC<IProps> = ({
  contents,
  activePageId,
  onActiveIdUpdate,
}) => {
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, IAnchor>>(new Map());

  useEffect(() => {
    setPages(objectToMap(contents.entities.pages));
    setAnchors(objectToMap(contents.entities.anchors));
  }, [contents.entities.anchors, contents.entities.pages]);

  return (
    <div className={style.root}>
      {contents?.topLevelIds.length ? (
        <ul>
          {contents.topLevelIds.map((pageId: string) => {
            const page = pages.get(pageId);
            if (!page) {
              return <p>No such page exists</p>;
            }

            return (
              <PagesContext.Provider value={pages}>
                <AnchorsContext.Provider value={anchors}>
                  <TOCItem
                    key={pageId}
                    id={pageId}
                    title={page.title}
                    marginLeft={page.level * ITEM_LEFT_MARGIN}
                    activeId={activePageId}
                    pagesIds={page.pages}
                    anchorsIds={page.anchors}
                    onSelectPage={onActiveIdUpdate}
                  />
                </AnchorsContext.Provider>
              </PagesContext.Provider>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TableOfContents;
