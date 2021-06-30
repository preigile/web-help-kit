import { PagesContext } from "../../context/PagesContext";
import { IAnchor } from "../../interfaces/anchor";
import { IContent } from "../../interfaces/content";
import { IPage } from "../../interfaces/page";
import React, { useEffect, useState } from "react";
import { objectToMap } from "../../utils/convertToMap";
import style from "./TableOfContents.module.scss";
import TOCItem from "./TOCItem";
import { AnchorsContext } from "context/AnchorsContext";
import SearchInput from "components/SearchInput";

interface IProps {
  contents: IContent;
  activePageId: string;
  onActiveIdUpdate: (id: string) => void;
}

const ITEM_LEFT_INDENT = 10;

const TableOfContents: React.FC<IProps> = ({
  contents,
  activePageId,
  onActiveIdUpdate,
}) => {
  const [query, setQuery] = useState<string>("");
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, IAnchor>>(new Map());
  const [filtered, setFiltered] = useState<string[]>(contents.topLevelIds);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = Array.from(pages).reduce<string[]>(
        (accum, [key, value]) => {
          if (value.title.toLowerCase().includes(query.toLowerCase())) {
            return [...accum, key];
          }

          return accum;
        },
        []
      );
      setFiltered(query ? filtered : contents.topLevelIds);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    setPages(objectToMap(contents.entities.pages));
    setAnchors(objectToMap(contents.entities.anchors));
  }, [contents.entities.anchors, contents.entities.pages]);

  return (
    <div className={style.root}>
      {contents?.topLevelIds.length ? (
        <>
          <SearchInput query={query} onChange={setQuery} />
          <ul>
            {filtered.map((pageId: string) => {
              const page = pages.get(pageId);
              if (!page) {
                return null;
              }

              return (
                <PagesContext.Provider key={pageId} value={pages}>
                  <AnchorsContext.Provider value={anchors}>
                    <TOCItem
                      id={pageId}
                      title={page.title}
                      leftIndent={page.level * ITEM_LEFT_INDENT}
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
        </>
      ) : null}
    </div>
  );
};

export default TableOfContents;
