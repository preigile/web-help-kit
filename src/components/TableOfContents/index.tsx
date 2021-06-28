import { IContent } from "../../interfaces/content";
import { IPage } from "../../interfaces/page";
import objectToMap from "../../utils/convertToMap";
import Skeleton from "../Skeleton";
import React, { useEffect, useState } from "react";
import style from "./TableOfContents.module.scss";
import TOCItem from "./TOCItem";

interface IProps {
  contents: IContent;
  isLoading: boolean;
  isError: boolean;
}

const TableOfContents: React.FC<IProps> = ({
  contents,
  isLoading,
  isError,
}) => {
  const [pages, setPages] = useState<Map<string, IPage>>(new Map());

  useEffect(() => {
    setPages(objectToMap(contents.entities.pages));
  }, []);

  if (isError) {
    return <div>Ups!</div>;
  }

  return (
    <div className={style.root}>
      <div>{pages.size}</div>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        contents &&
        contents.topLevelIds.map((pageId: string) => {
          const page = pages.get(pageId);
          if (!page) {
            return <p>There empty page</p>;
          }

          return (
            <div key={pageId}>
              <TOCItem
                id={pageId}
                title={page.title}
                marginLeft={page.level * 10}
                isActive={false}
                isOpen={false}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TableOfContents;
