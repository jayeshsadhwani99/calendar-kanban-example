import { useEventContext } from "../../../contexts/EventContext";
import {
  clearHighlights,
  formatDate,
  getEventsForDate,
  highlightIndicator,
} from "../../../utils";

export const useDragEventsForDay = (date: Date) => {
  const {
    moveEvent,
    setCurrentDraggedEventData,
    currentDraggedEventData,
    eventsByDate,
  } = useEventContext();

  const eventsList = getEventsForDate(date, eventsByDate);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e, date);
  };

  const handleDragLeave = () => {
    clearHighlights(date);
  };

  const handleDragEnd = () => {
    clearHighlights(date);
    const { eventId, date: fromDate } = currentDraggedEventData;
    moveEvent(eventId, formatDate(fromDate), formatDate(date));
  };

  const handleDragStart = (_: any, id: string, date: Date) => {
    setCurrentDraggedEventData({
      eventId: id,
      date,
    });
  };

  return {
    eventsList,
    handleDragOver,
    handleDragLeave,
    handleDragEnd,
    handleDragStart,
  };
};
