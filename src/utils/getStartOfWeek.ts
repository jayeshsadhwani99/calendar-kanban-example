import { addDays } from ".";

// Utility: get the Monday of the week (week runs Monday–Sunday)
export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // If today is Sunday, subtract 6 days; otherwise, subtract (day - 1)
  const diff = day === 0 ? -6 : 1 - day;
  const monday = addDays(date, diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};
