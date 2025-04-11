export type CalendarContextProps = {
  weekStart: Date;
  selectedDayIndex: number;
  weekDirection: number;
  weekDates: Date[];
  activeDate: Date;
  handleDayClick: (index: number) => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  setActiveDate: (date: Date) => void;
};
