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
    const { id, date: fromDate } = currentDraggedEventData;
    moveEvent(id, formatDate(fromDate), formatDate(date));
    setCurrentDraggedEventData(undefined);
  };

  const handleDragStart = (_: any, id: string, date: Date) => {
    setCurrentDraggedEventData({
      id,
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
