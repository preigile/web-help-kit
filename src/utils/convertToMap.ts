import { IObject } from "../interfaces/object";

export const objectToMap = <T>(object: IObject<T>): Map<string, T> => {
  const map = new Map<string, T>();
  for (let key in object) {
    map.set(key, object[key]);
  }

  return map;
};
