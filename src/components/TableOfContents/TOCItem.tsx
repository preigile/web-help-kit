import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/all";
import { AnchorsContext } from "../../context/AnchorsContext";
import { PagesContext } from "../../context/PagesContext";
import { getParentsId } from "../../utils/getParentsId";
import Anchor from "./Anchor";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  activeId: string;
  leftIndent: number;
  pagesIds?: string[];
  anchorsIds?: string[];

  onSelect: (pageId: string) => void;
}

const ITEM_LEFT_MARGIN = 10;
const ALONG_LEFT_INDENT = 16;

const TOCItem: React.FC<IProps> = ({
  id,
  title,
  activeId,
  leftIndent,
  pagesIds,
  anchorsIds,
  onSelect,
}) => {
  const pages = useContext(PagesContext);
  const anchors = useContext(AnchorsContext);
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
    onSelect(pageId);
    setIsOpen((current) => {
      return !current;
    });
  };

  const anchorClickHandler = (id: string) => {
    onSelect(id);
  };

  const checkGroupIsActive = (): boolean => {
    const hasActiveAnchor = anchorsIds && anchorsIds.includes(activeId);

    return id === activeId || (hasActiveAnchor as boolean);
  };

  return (
    <>
      <li
        className={cn(style.root, {
          [style.active]: id === activeId,
          [style.activeGroup]: checkGroupIsActive(),
        })}
        id={id}
      >
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
          <span className={style.title}>{title}</span>
        </div>
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
                leftIndent={
                  page.level *
                  (hasChildren ? ITEM_LEFT_MARGIN : ALONG_LEFT_INDENT)
                }
                pagesIds={page.pages}
                anchorsIds={page.anchors}
                onSelect={onSelect}
              />
            );
          })
        : null}

      {isOpen && hasAnchors
        ? anchorsIds?.map((anchorId) => {
            const anchor = anchors.get(anchorId);
            if (!anchor) {
              return null;
            }

            return (
              <li
                key={anchorId}
                id={anchorId}
                className={cn(style.root, {
                  [style.active]: anchorId === activeId,
                  [style.activeGroup]: checkGroupIsActive(),
                })}
              >
                <Anchor
                  id={anchorId}
                  leftIndent={
                    leftIndent + (anchor.level + 1) * ALONG_LEFT_INDENT
                  }
                  title={anchor.title}
                  onSelect={anchorClickHandler}
                />
              </li>
            );
          })
        : null}
    </>
  );
};

export default TOCItem;
