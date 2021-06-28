import { IObject } from "../interfaces/object";

function objectToMap<T>(object: IObject<T>): Map<string, T> {
  let map = new Map<string, T>();
  for (let key in object) {
    map.set(key, object[key]);
  }

  return map;
}

export default objectToMap;
