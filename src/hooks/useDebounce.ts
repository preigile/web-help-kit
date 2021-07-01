import { useEffect, useState } from "react";

const useDebounce = (
  value: string,
  delay: number,
  func: () => void
): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      func();
      setIsLoading(false);
    }, delay);

    return () => {
      clearInterval(handler);
    };
  }, [value, delay]);

  return isLoading;
};

export default useDebounce;
