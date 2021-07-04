import { RefObject, useEffect, useRef } from "react";
import { KeyEvent } from "../enums/keyEvent";
import { handleEvents } from "../utils/handleEvents";

export const useArrowKeyNavigation = <T>(selectors: string): RefObject<T> => {
  const parentNode = useRef<T>(null);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      handleEvents({
        event,
        parentNode: parentNode.current as unknown as HTMLElement,
        selectors,
      });
    };
    document.addEventListener(KeyEvent.Keydown, eventHandler);

    return () => document.removeEventListener(KeyEvent.Keydown, eventHandler);
  }, []);

  return parentNode;
};
