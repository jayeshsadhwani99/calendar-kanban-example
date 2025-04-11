import { createContext } from "react";
import { CalendarContextProps } from "./types";

export const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);
