import { useCallback, useState } from "react";
import { addDays, getStartOfWeek } from "../../utils";
import { CalendarProviderProps } from "./types";
import { CalendarContext } from "./Context";

// Initial computations using today's date
const today = new Date();
const initialWeekStart = getStartOfWeek(today);
const initialIndex = today.getDay();

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [weekStart, setWeekStart] = useState<Date>(initialWeekStart);
  const [selectedDayIndex, setSelectedDayIndex] =
    useState<number>(initialIndex);
  const [weekDirection, setWeekDirection] = useState<number>(0);

  // Calculate dates for the week (Sunday through Monday)
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Update selected day when a day is clicked
  const handleDayClick = useCallback((index: number) => {
    setSelectedDayIndex(index);
    const date = weekDates[index];
    const element = document.getElementById(`day-${date.toDateString()}`);
    if (element && date.getDay() === selectedDayIndex) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  // Navigate to the previous week and update week direction
  const goToPreviousWeek = useCallback(() => {
    setWeekDirection(-1);
    setWeekStart((prev) => addDays(prev, -7));
    handleDayClick(6);
    setWeekDirection(0);
  }, []);

  // Navigate to the next week and update week direction
  const goToNextWeek = useCallback(() => {
    setWeekDirection(1);
    setWeekStart((prev) => addDays(prev, 7));
    handleDayClick(0);
    setWeekDirection(0);
  }, []);

  const setActiveDate = useCallback((date: Date) => {
    const newWeekStart = getStartOfWeek(date);
    const newIndex = date.getDay();

    setWeekStart(newWeekStart);
    handleDayClick(newIndex);
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        weekStart,
        selectedDayIndex,
        weekDirection,
        weekDates,
        // activeDate,
        handleDayClick,
        setActiveDate,
        goToPreviousWeek,
        goToNextWeek,
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
