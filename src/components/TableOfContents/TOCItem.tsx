import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/all";
import { PagesContext } from "../../context/PagesContext";
import { getParentsId } from "../../utils/getParentsId";

import AnchorList from "./AnchorList";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  activeId: string;
  leftIndent: number;
  pagesIds?: string[];
  anchorsIds?: string[];

  onSelectPage: (pageId: string) => void;
}

const ITEM_LEFT_MARGIN = 10;

const TOCItem: React.FC<IProps> = ({
  id,
  title,
  activeId,
  leftIndent,
  pagesIds,
  anchorsIds,
  onSelectPage,
}) => {
  const pages = useContext(PagesContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hasNestedPage = pagesIds && pagesIds.length > 0;
  const hasAnchors = anchorsIds && anchorsIds.length > 0;
  const hasChildren = hasNestedPage || hasAnchors;

  useEffect(() => {
    const parentIdsSet: Set<string> = new Set(getParentsId(activeId, pages));
    if (parentIdsSet.has(id)) {
      setIsOpen(true);
    }

    if (id === activeId) {
      setIsOpen(true);
    }
  }, []);

  const clickHandler = (pageId: string) => {
    onSelectPage(pageId);
    setIsOpen((current) => {
      return !current;
    });
  };

  return (
    <>
      <li className={cn(style.root, { [style.active]: id === activeId })}>
        <div
          className={style.pageLink}
          style={{ paddingLeft: leftIndent }}
          onClick={() => clickHandler(id)}
        >
          {hasChildren && (
            <span className={style.icon}>
              <BiChevronUp
                className={cn(style.chevronIcon, {
                  [style.chevronDown]: isOpen,
                })}
              />
            </span>
          )}
          <span className={cn(style.title, style.pageTitle)}>{title}</span>
        </div>
        {isOpen && hasAnchors ? (
          <ul className={style.anchorList} onClick={() => onSelectPage(id)}>
            <AnchorList
              anchorsIds={anchorsIds!}
              leftIndent={leftIndent}
              parentIsActive={id === activeId}
            />
          </ul>
        ) : null}
      </li>

      {isOpen && hasNestedPage
        ? pagesIds?.map((pageId) => {
            const page = pages?.get(pageId);
            if (!page) {
              return null;
            }

            return (
              <TOCItem
                key={pageId}
                id={pageId}
                title={page.title}
                activeId={activeId}
                leftIndent={page.level * ITEM_LEFT_MARGIN}
                pagesIds={page.pages}
                anchorsIds={page.anchors}
                onSelectPage={(id) => onSelectPage(id)}
              />
            );
          })
        : null}
    </>
  );
};

export default TOCItem;
