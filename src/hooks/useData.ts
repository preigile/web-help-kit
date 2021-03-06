import { useEffect, useState } from "react";
import getRequest from "../utils/request";

interface IResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

const useData = <T>(
  endpoint: string,
  plug: T,
  deps: any[] = []
): IResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await getRequest<T>(endpoint);

        setData(result);
      } catch (error) {
        setData(plug);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, deps);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useData;
