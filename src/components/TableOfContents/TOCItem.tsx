import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/all";
import cn from "classnames";
import { IAnchor } from "../../interfaces/anchor";
import { IPage } from "../../interfaces/page";
import style from "./TOCItem.module.scss";

interface IProps {
  id: string;
  title: string;
  marginLeft: number;
  pagesIds?: string[];
  anchorsIds?: string[];
  pages?: Map<string, IPage>;
  anchors?: Map<string, IAnchor>;
}

const ITEM_LEFT_MARGIN = 10;

const TOCItem: React.FC<IProps> = ({
  id,
  title,
  marginLeft,
  pagesIds,
  anchorsIds,
  pages,
  anchors,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hasNestedPage = pagesIds && pagesIds.length > 0;
  const hasAnchors = anchorsIds && anchorsIds.length > 0;
  const hasChildren = hasNestedPage || hasAnchors;

  const clickHandler = () => {
    console.log("pagesIds", pagesIds);
    console.log("anchorsIds", anchorsIds);
    setIsOpen((current) => {
      return !current;
    });
  };

  return (
    <>
      <li
        className={style.root}
        style={{ marginLeft: marginLeft }}
        onClick={() => clickHandler()}
      >
        {hasChildren && (
          <span className={style.icon}>
            {isOpen ? <BiChevronUp /> : <BiChevronDown />}
          </span>
        )}
        <span className={style.title}>{title}</span>
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
                marginLeft={page.level * ITEM_LEFT_MARGIN}
                pagesIds={page.pages}
                anchorsIds={page.anchors}
                pages={pages}
                anchors={anchors}
              />
            );
          })
        : null}

      {isOpen && hasAnchors
        ? anchorsIds?.map((anchorId) => {
            const anchor = anchors?.get(anchorId);
            if (!anchor) {
              return null;
            }

            return (
              <li
                key={anchorId}
                className={style.root}
                style={{ marginLeft: marginLeft + ITEM_LEFT_MARGIN }}
                onClick={() => clickHandler()}
              >
                <span className={cn(style.title, style.anchorTitle)}>
                  {anchor.title}
                </span>
              </li>
            );
          })
        : null}
    </>
  );
};

export default TOCItem;
