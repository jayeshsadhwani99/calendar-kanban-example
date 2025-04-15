import { useRef } from "react";
import { DAY_CHANGE_TIMEOUT, THRESHOLD_FOR_WEEK_CHANGE } from "../constants";
import { useCalendar, useEventContext } from "../contexts";
import { formatDate, getTomorrow, getYesterday } from "../utils";

export const useHandleDrag = () => {
  const timeoutRef = useRef<number>(undefined);
  const {
    currentDraggedEventData,
    eventsByDate,
    setDragCoordinates,
    moveEvent,
    setCurrentDraggedEventData,
  } = useEventContext();
  const { weekDates, selectedDayIndex, setActiveDate } = useCalendar();

  const handleTouchMove = (e: any) => {
    if (!currentDraggedEventData?.id) return;
    const touch = e.touches[0];
    const { clientX: x, clientY: y } = touch;
    setDragCoordinates({ x, y });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (x < THRESHOLD_FOR_WEEK_CHANGE) {
      timeoutRef.current = setTimeout(() => {
        const activeDate = weekDates[selectedDayIndex];
        setActiveDate(getYesterday(activeDate));
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, DAY_CHANGE_TIMEOUT);
    }
    if (x > window.innerWidth - THRESHOLD_FOR_WEEK_CHANGE) {
      timeoutRef.current = setTimeout(() => {
        const activeDate = weekDates[selectedDayIndex];
        setActiveDate(getTomorrow(activeDate));
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, DAY_CHANGE_TIMEOUT);
    }
  };

  const handleTouchEnd = () => {
    const activeDate = weekDates[selectedDayIndex];
    if (!currentDraggedEventData?.id) return;
    const { id, date } = currentDraggedEventData;
    if (!eventsByDate[formatDate(activeDate)]?.find((e) => e.id === id)) {
      moveEvent(id, formatDate(date), formatDate(activeDate));
    }
    setCurrentDraggedEventData(undefined);
  };

  const handleTouchCancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentDraggedEventData(undefined);
  };

  return {
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
  };
};
