import { KeyCode } from "../enums/keyCode";

interface IHandleProps {
  event: KeyboardEvent;
  parentNode: HTMLElement;
  selectors: string;
}

interface IHandleArrowProps {
  event: KeyboardEvent;
  currentIndex: number;
  availableElements: NodeListOf<HTMLElement>;
}

export const handleEvents = ({
  event,
  parentNode,
  selectors = "li",
}: IHandleProps): void => {
  if (!parentNode) {
    return;
  }

  const key = event.key as KeyCode;
  if (![KeyCode.ArrowUp, KeyCode.ArrowDown].includes(key)) {
    return;
  }

  const activeElement = document.activeElement;

  if (!parentNode.contains(activeElement)) {
    return;
  }

  const availableElements = parentNode.querySelectorAll(
    selectors
  ) as NodeListOf<HTMLElement>;

  if (!availableElements.length) {
    return;
  }

  const currentIndex = Array.from(availableElements).findIndex(
    (availableElement) => availableElement === activeElement
  );

  handleArrowKey({ event, currentIndex, availableElements });
};

function handleArrowKey({
  event,
  currentIndex,
  availableElements,
}: IHandleArrowProps): void {
  if (currentIndex === -1) {
    availableElements[0].focus();
  }

  let nextElement;
  switch (event.key) {
    case KeyCode.ArrowDown: {
      nextElement = availableElements[currentIndex + 1];
      break;
    }
    case KeyCode.ArrowUp: {
      nextElement = availableElements[currentIndex - 1];
      break;
    }
  }

  nextElement && nextElement.focus();
}
