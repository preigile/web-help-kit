import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IPage } from "../../interfaces/page";
import objectToMap from "../../utils/convertToMap";
import React, { useEffect, useState } from "react";
import style from "./TableOfContents.module.scss";
import TOCItem from "./TOCItem";

interface IProps {
  contents: IContent;
  isError: boolean;
  activePageId: string;
  onActiveIdUpdate: (id: string) => void;
}

const ITEM_LEFT_MARGIN = 10;

const TableOfContents: React.FC<IProps> = ({
  contents,
  isError,
  activePageId,
  onActiveIdUpdate,
}) => {
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, IAnchor>>(new Map());

  useEffect(() => {
    setPages(objectToMap(contents.entities.pages));
    setAnchors(objectToMap(contents.entities.anchors));
  }, [contents.entities.anchors, contents.entities.pages]);

  if (isError) {
    return <div>Ups!</div>;
  }

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
              <TOCItem
                key={pageId}
                id={pageId}
                title={page.title}
                marginLeft={page.level * ITEM_LEFT_MARGIN}
                activeId={activePageId}
                pagesIds={page.pages}
                anchorsIds={page.anchors}
                pages={pages}
                anchors={anchors}
                onSelectPage={onActiveIdUpdate}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default TableOfContents;
