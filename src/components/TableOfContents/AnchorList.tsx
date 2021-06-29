import React, { useContext, useState } from "react";
import { AnchorsContext } from "../../context/AnchorsContext";
import Anchor from "./Anchor";
import style from "./TOCItem.module.scss";

interface IProps {
  anchorsIds: string[];
  marginLeft: number;
  parentIsActive: boolean;
}

const AnchorList: React.FC<IProps> = ({
  anchorsIds,
  marginLeft,
  parentIsActive,
}) => {
  const anchors = useContext(AnchorsContext);
  const [activeId, setActiveId] = useState<string>("");

  return (
    <>
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
              isActive={parentIsActive && activeId === anchorId}
              onSelect={setActiveId}
            />
          </li>
        );
      })}
    </>
  );
};

export default AnchorList;
