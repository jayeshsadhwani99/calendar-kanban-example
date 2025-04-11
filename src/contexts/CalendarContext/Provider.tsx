import { useCallback, useState } from "react";
import { addDays, getStartOfWeek } from "../../utils";
import { CalendarProviderProps } from "./types";
import { CalendarContext } from "./Context";

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  // Initial computations
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

  // Update selected day when header is clicked
  const handleDayClick = useCallback((index: number) => {
    setSelectedDayIndex(index);
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
        goToPreviousWeek,
        goToNextWeek,
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
