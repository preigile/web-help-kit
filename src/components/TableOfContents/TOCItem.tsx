import cn from "classnames";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/all";

import { IAnchor } from "../../interfaces/anchor";
import { IPage } from "../../interfaces/page";
import Anchor from "./Anchor";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  activeId: string;
  marginLeft: number;
  pagesIds?: string[];
  anchorsIds?: string[];
  pages?: Map<string, IPage>;
  anchors?: Map<string, IAnchor>;

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
  pages,
  anchors,
  onSelectPage,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeAnchorId, setActiveAnchorId] = useState<string>("");

  const hasNestedPage = pagesIds && pagesIds.length > 0;
  const hasAnchors = anchorsIds && anchorsIds.length > 0;
  const hasChildren = hasNestedPage || hasAnchors;

  useEffect(() => {
    if (id === activeId) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    setIsActive(id === activeId);
  }, [activeId, id]);

  const clickHandler = (pageId: string) => {
    onSelectPage(pageId);
    setIsOpen((current) => {
      return !current;
    });
  };

  const onSelectAnchor = (anchorId: string) => {
    setActiveAnchorId(anchorId);
    console.log("anchorId", anchorId);
  };

  return (
    <>
      <li className={cn(style.root, { [style.active]: isActive })}>
        <div
          className={style.pageLink}
          style={{ marginLeft: marginLeft }}
          onClick={() => clickHandler(id)}
        >
          {hasChildren && (
            <span className={style.icon}>
              {isOpen ? <BiChevronUp /> : <BiChevronDown />}
            </span>
          )}
          <span className={style.title}>{title}</span>
        </div>
        {isOpen && hasAnchors ? (
          <ul className={style.anchorList}>
            {anchorsIds?.map((anchorId) => {
              const anchor = anchors?.get(anchorId);
              if (!anchor) {
                return null;
              }

              return (
                <li key={anchorId}>
                  <Anchor
                    id={anchorId}
                    marginLeft={marginLeft}
                    title={anchor.title}
                    activeId={activeAnchorId}
                    onSelect={(id) => onSelectAnchor(id)}
                  />
                </li>
              );
            })}
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
                pages={pages}
                anchors={anchors}
                onSelectPage={(id) => onSelectPage(id)}
              />
            );
          })
        : null}
    </>
  );
};

export default TOCItem;
