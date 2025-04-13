import { useEventContext } from "../../../contexts/EventContext";
import {
  clearHighlights,
  formatDate,
  getEventsForDate,
  getIndicators,
  getNearestIndicator,
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

  const handleDragEnd = (e: any) => {
    clearHighlights(date);

    const { eventId, date: fromDate } = currentDraggedEventData;

    const indicators = getIndicators(date);
    const { element } = getNearestIndicator(e, indicators);

    const before = (element as HTMLElement).dataset.before || "-1";

    if (before === eventId) return;

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
