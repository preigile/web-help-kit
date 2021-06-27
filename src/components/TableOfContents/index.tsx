import React, { useEffect, useState } from "react";
import { IContent } from "../../interfaces/content";
import style from "./TableOfContents.module.scss";

const TableOfContents = () => {
  const [items, setItems] = useState<IContent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/help/idea/2018.3/HelpTOC.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.topLevelIds);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ups!</div>;
  }

  return (
    <div className={style.root}>
      {items.map((id) => {
        return <div>{id}</div>;
      })}
    </div>
  );
};

export default TableOfContents;
