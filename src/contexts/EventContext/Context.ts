import { createContext } from "react";
import { EventContextType } from "./types";

export const EventContext = createContext<EventContextType | undefined>(
  undefined,
);
