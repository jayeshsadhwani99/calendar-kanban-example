// CalendarContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Utility: Returns a new Date with added days.
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Utility: Get the Monday of the week (week runs Monday–Sunday).
const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // If today is Sunday, subtract 6 days; otherwise, subtract (day - 1)
  const diff = day === 0 ? -6 : 1 - day;
  const monday = addDays(date, diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

interface CalendarContextProps {
  weekStart: Date;
  selectedDayIndex: number;
  weekDirection: number;
  weekDates: Date[];
  activeDate: Date;
  handleDayClick: (index: number) => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

export const useCalendar = (): CalendarContextProps => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

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
