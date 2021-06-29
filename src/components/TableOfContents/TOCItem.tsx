import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/all";
import { PagesContext } from "../../context/PagesContext";

import AnchorList from "./AnchorList";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  activeId: string;
  marginLeft: number;
  pagesIds?: string[];
  anchorsIds?: string[];

  onSelectPage: (pageId: string) => void;
}

const ITEM_LEFT_MARGIN = 10;

const TOCItem: React.FC<IProps> = ({
  id,
  title,
  activeId,
  marginLeft,
  pagesIds,
  anchorsIds,
  onSelectPage,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pages = useContext(PagesContext);

  const hasNestedPage = pagesIds && pagesIds.length > 0;
  const hasAnchors = anchorsIds && anchorsIds.length > 0;
  const hasChildren = hasNestedPage || hasAnchors;

  useEffect(() => {
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
          style={{ marginLeft: marginLeft }}
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
              marginLeft={marginLeft}
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
                marginLeft={page.level * ITEM_LEFT_MARGIN}
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
