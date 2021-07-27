import React from "react";
import style from "./SearchInput.module.scss";

interface IProps {
  query: string;
  placeholder?: string;
  onChange: (query: string) => void;
}

const SearchInput: React.FC<IProps> = ({
  query,
  placeholder = "filter pages",
  onChange,
}) => {
  return (
    <input
      className={style.root}
      name="search"
      value={query}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default SearchInput;
