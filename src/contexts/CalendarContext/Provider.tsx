import { useCallback, useState } from "react";
import { addDays, getStartOfWeek } from "../../utils";
import { CalendarProviderProps } from "./types";
import { CalendarContext } from "./Context";

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  // Initial computations using today's date
  const today = new Date();
  const initialWeekStart = getStartOfWeek(today);
  const initialIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

  const [weekStart, setWeekStart] = useState<Date>(initialWeekStart);
  const [selectedDayIndex, setSelectedDayIndex] =
    useState<number>(initialIndex);
  const [weekDirection, setWeekDirection] = useState<number>(0);

  // Calculate dates for the week (Monday through Sunday)
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // The active date is computed based on week start and selected day index.
  const activeDate = addDays(weekStart, selectedDayIndex);

  // Update selected day when a day is clicked
  const handleDayClick = useCallback((index: number) => {
    setSelectedDayIndex(index);
  }, []);

  // Function to reset the calendar to today.
  const handleTodayClick = useCallback(() => {
    const newToday = new Date();
    const newWeekStart = getStartOfWeek(newToday);
    // Adjust day index: if Sunday (0) then set index to 6, else day-1
    const newIndex = newToday.getDay() === 0 ? 6 : newToday.getDay() - 1;
    setWeekStart(newWeekStart);
    setSelectedDayIndex(newIndex);
  }, []);

  // Navigate to the previous week and update week direction
  const goToPreviousWeek = useCallback(() => {
    setWeekDirection(-1);
    setWeekStart((prev) => addDays(prev, -7));
  }, []);

  // Navigate to the next week and update week direction
  const goToNextWeek = useCallback(() => {
    setWeekDirection(1);
    setWeekStart((prev) => addDays(prev, 7));
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        weekStart,
        selectedDayIndex,
        weekDirection,
        weekDates,
        activeDate,
        handleDayClick,
        handleTodayClick,
        goToPreviousWeek,
        goToNextWeek,
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
