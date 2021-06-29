import React, { useContext, useState } from "react";
import { AnchorsContext } from "../../context/AnchorsContext";
import Anchor from "./Anchor";
import style from "./TOCItem.module.scss";

interface IProps {
  anchorsIds: string[];
  marginLeft: number;
}

const AnchorList: React.FC<IProps> = ({ anchorsIds, marginLeft }) => {
  const [activeId, setActiveId] = useState<string>("");

  const anchors = useContext(AnchorsContext);

  return (
    <ul className={style.anchorList}>
      {anchorsIds.map((anchorId) => {
        const anchor = anchors.get(anchorId);
        if (!anchor) {
          return null;
        }

        return (
          <li key={anchorId}>
            <Anchor
              id={anchorId}
              marginLeft={marginLeft}
              title={anchor.title}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default AnchorList;
