import React from "react";
import style from "./TableOfContents.module.scss";

interface IProps {
  contents: any;
  isLoading: boolean;
  isError: boolean;
}

const TableOfContents: React.FC<IProps> = ({
  contents,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ups!</div>;
  }

  return (
    <div className={style.root}>
      {contents &&
        contents.topLevelIds.map((id: string) => {
          return <div key={id}>{id}</div>;
        })}
    </div>
  );
};

export default TableOfContents;
