import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import { BiChevronUp } from "react-icons/all";
import { AnchorsContext } from "../../context/AnchorsContext";
import { PagesContext } from "../../context/PagesContext";
import { KeyCode } from "../../enums/keyCode";
import { getParentsId } from "../../utils/getParentsId";
import Anchor from "./Anchor";
import style from "./TOCItem.module.scss";

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
  const hasChildren = hasNestedPage || hasAnchors;

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

  const clickHandler = (isOpen: boolean): void => {
    history.push(`/${url}?id:${id}`);
    onSelect(id);
    if (hasChildren) {
      setIsOpen(isOpen);
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
      <li
        className={cn(style.root, {
          [style.active]: id === activeId,
          [style.activeGroup]: checkGroupIsActive(),
        })}
        id={id}
        tabIndex={0}
        onKeyDown={keyDownPage}
      >
        <Link
          to={`/${url}?id:${id}`}
          className={style.pageLink}
          style={{ paddingLeft: leftIndent }}
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
          <span className={style.title}>{title}</span>
        </Link>
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
              <li
                key={anchorId}
                id={anchorId}
                className={cn(style.root, {
                  [style.active]: anchorId === activeId,
                  [style.activeGroup]: checkGroupIsActive(),
                })}
                tabIndex={0}
                onKeyDown={(event) => keyDownAnchor(event, anchorId)}
              >
                <Anchor
                  id={anchorId}
                  leftIndent={
                    leftIndent + (anchor.level + 1) * ALONG_LEFT_INDENT
                  }
                  title={anchor.title}
                  url={anchor.url}
                  anchor={anchor.anchor}
                  onSelect={onSelect}
                />
              </li>
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
