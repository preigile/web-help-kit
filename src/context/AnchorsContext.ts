import { createContext } from "react";
import { IAnchor } from "../interfaces/anchor";

export const AnchorsContext = createContext<Map<string, IAnchor>>(new Map());
