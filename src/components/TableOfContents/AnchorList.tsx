import React, { useContext, useState } from "react";
import { AnchorsContext } from "../../context/AnchorsContext";
import Anchor from "./Anchor";

interface IProps {
  anchorsIds: string[];
  leftIndent: number;
  parentIsActive: boolean;
}

const AnchorList: React.FC<IProps> = ({
  anchorsIds,
  leftIndent,
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
              leftIndent={leftIndent}
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
