export const getTomorrow = (d: Date = new Date()) => {
  const date: Date = new Date(d.toDateString());
  date.setDate(date.getDate() + 1);

  return date;
};
