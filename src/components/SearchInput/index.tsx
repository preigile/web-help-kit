import React from "react";
import style from "./SearchInput.module.scss";

interface IProps {
  query: string;
  onChange: (query: string) => void;
}

const SearchInput: React.FC<IProps> = ({ query, onChange }) => {
  return (
    <input
      className={style.root}
      key="search"
      value={query}
      placeholder={"filter pages"}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default SearchInput;
