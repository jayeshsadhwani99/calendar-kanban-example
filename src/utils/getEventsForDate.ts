import eventsList, { Event, EventsByDate } from "../data/demo";

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getEventsForDate = (
  date: Date,
  events: EventsByDate = eventsList,
): Event[] => {
  const key = formatDateKey(date);
  return events[key] || [];
};
