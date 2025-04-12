import { addDays } from ".";

export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = -day;
  const sunday = addDays(date, diff);
  sunday.setHours(0, 0, 0, 0);
  return sunday;
};
