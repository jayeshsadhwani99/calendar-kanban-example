import eventsList, { Event, EventsByDate } from "../data/demo";

export const findEventById = (
  id: string,
  events: EventsByDate = eventsList,
): Event | undefined => {
  for (const dayEvents of Object.values(events)) {
    const found = dayEvents.find((event) => event.id === id);
    if (found) return found;
  }
  return undefined;
};
