import { formatDate } from "..";

export const getIndicators = (date: Date) => {
  return Array.from(
    document.querySelectorAll(`[data-day="${formatDate(date)}"]`),
  );
};
