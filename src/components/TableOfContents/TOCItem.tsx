import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/all";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import { AnchorsContext } from "../../context/AnchorsContext";
import { PagesContext } from "../../context/PagesContext";
import { KeyCode } from "../../enums/keyCode";
import { getParentsId } from "../../utils/getParentsId";
import style from "./TOCItem.module.scss";
import LinkedList from "./LinkedList";

interface IProps {
  id: string;
  title: string;
  url: string;
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
  url,
  activeId,
  leftIndent,
  pagesIds,
  anchorsIds,
  onSelect,
}) => {
  const history = useHistory();
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
    history.push(`/${url}?id:${id}`);
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
    }
  };

  const keyDownAnchor = (
    event: React.KeyboardEvent<HTMLElement>,
    id: string
  ): void => {
    if (event.key === KeyCode.Enter) {
      history.push(`/${url}?id:${id}`);
      onSelect(id);
    }
  };

  return (
    <Router>
      <LinkedList
        id={id}
        title={title}
        url={`/${url}?id:${id}`}
        leftIndent={leftIndent}
        isActive={id === activeId}
        isActiveGroup={checkGroupIsActive()}
        clickHandler={() => clickHandler(!isOpen)}
        keyDownHandler={keyDownPage}
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
        <span className={cn(style.title, { [style.active]: id === activeId })}>
          {title}
        </span>
      </LinkedList>

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
                url={page.url}
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
              <LinkedList
                key={anchorId}
                id={anchorId}
                title={anchor.title}
                url={`/${anchor.url}${anchor.anchor}?id:${id}`}
                leftIndent={leftIndent + (anchor.level + 1) * ALONG_LEFT_INDENT}
                isActive={anchorId === activeId}
                isActiveGroup={checkGroupIsActive()}
                clickHandler={() => onSelect(anchorId)}
                keyDownHandler={(event) => keyDownAnchor(event, anchorId)}
              >
                <div
                  className={cn(style.title, {
                    [style.active]: anchorId === activeId,
                  })}
                >
                  {anchor.title}
                </div>
              </LinkedList>
            );
          })
        : null}

      <Switch>
        <Route exact path={`/:url`} />
      </Switch>
    </Router>
  );
};

export default TOCItem;
