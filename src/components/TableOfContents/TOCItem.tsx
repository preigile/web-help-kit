import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/all";
import { AnchorsContext } from "../../context/AnchorsContext";
import { PagesContext } from "../../context/PagesContext";
import { KeyCode } from "../../enums/keyCode";
import { getParentsId } from "../../utils/getParentsId";
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

const INITIAL_INDENT = 16;
const LEFT_INDENT = 10;
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
  const hasChildren = Boolean(hasNestedPage || hasAnchors);

  useEffect(() => {
    const anchor = anchors.get(activeId);
    const startId = anchor ? anchor.parentId : activeId;
    const parentIdsSet: Set<string> = new Set([
      startId,
      ...getParentsId(startId, pages),
    ]);
    if (parentIdsSet.has(id)) {
      setIsOpen(true);
    }
  }, []);

  const checkGroupIsActive = (): boolean => {
    const hasActiveAnchor = anchorsIds && anchorsIds.includes(activeId);

    return id === activeId || (hasActiveAnchor as boolean);
  };

  const clickHandler = (opened: boolean): void => {
    onSelect(id);
    if (hasChildren) {
      setIsOpen(opened);
    }
  };

  const keyDownPage = (event: React.KeyboardEvent<HTMLElement>): void => {
    switch (event.key) {
      case KeyCode.ArrowLeft: {
        clickHandler(false);
        break;
      }
      case KeyCode.ArrowRight: {
        clickHandler(true);
        break;
      }
      case KeyCode.Enter: {
        clickHandler(!isOpen);
        break;
      }
    }
  };

  const keyDownAnchor = (
    event: React.KeyboardEvent<HTMLElement>,
    id: string
  ): void => {
    if (event.key === KeyCode.Enter) {
      onSelect(id);
    }
  };

  return (
    <>
      <li
        className={cn(style.tocItem, {
          [style.active]: id === activeId,
          [style.activeGroup]: checkGroupIsActive(),
        })}
        style={{ paddingLeft: leftIndent + INITIAL_INDENT }}
        tabIndex={0}
        onKeyDown={keyDownPage}
        onClick={() => clickHandler(!isOpen)}
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
        <span className={cn(style.title)}>{title}</span>
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
                  page.level * (hasChildren ? LEFT_INDENT : ALONG_LEFT_INDENT)
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
                className={cn(style.tocItem, {
                  [style.active]: anchorId === activeId,
                  [style.activeGroup]: checkGroupIsActive(),
                })}
                style={{
                  paddingLeft:
                    leftIndent +
                    INITIAL_INDENT +
                    (anchor.level + 1) * ALONG_LEFT_INDENT,
                }}
                tabIndex={0}
                onKeyDown={(event) => keyDownAnchor(event, anchorId)}
                onClick={() => onSelect(anchorId)}
              >
                <span className={cn(style.title)}>{anchor.title}</span>
              </li>
            );
          })
        : null}
    </>
  );
};

export default TOCItem;
