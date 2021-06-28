import { IAnchor } from "./anchor";
import { IObject } from "./object";
import { IPage } from "./page";

export interface IContent {
  entities: {
    pages: IObject<IPage>;
    anchors: IObject<IAnchor>;
  };
  topLevelIds: string[];
}
