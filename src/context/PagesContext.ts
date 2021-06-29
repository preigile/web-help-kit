import { createContext } from "react";
import { IPage } from "../interfaces/page";

export const PagesContext = createContext<Map<string, IPage>>(new Map());
