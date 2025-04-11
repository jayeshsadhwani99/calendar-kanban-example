import { useContext } from "react";
import { CalendarContextProps } from "../types";
import { CalendarContext } from "../Context";

export const useCalendar = (): CalendarContextProps => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
