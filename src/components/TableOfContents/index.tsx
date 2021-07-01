import { PagesContext } from "../../context/PagesContext";
import { withLoading } from "../../hoc/withLoading";
import useDebounce from "../../hooks/useDebounce";
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
const TableOfContentWithLoading = withLoading(TOCItem);

const TableOfContents: React.FC<IProps> = ({
  contents,
  activePageId,
  onActiveIdUpdate,
}) => {
  const [query, setQuery] = useState<string>("");
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());
  const [anchors, setAnchors] = useState<Map<string, IAnchor>>(new Map());
  const [filtered, setFiltered] = useState<string[]>(contents.topLevelIds);

  const search = () => {
    const filtered = Array.from(pages.values())
      .filter((value) =>
        value.title.toLowerCase().includes(query.toLowerCase())
      )
      .map((value) => value.id);

    setFiltered(query ? filtered : contents.topLevelIds);
  };

  const isSearching = useDebounce(query, 500, search);

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
                    <TableOfContentWithLoading
                      isLoading={isSearching}
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
