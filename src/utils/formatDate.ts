export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  // Note: getMonth() returns a 0-indexed month, so add 1 and pad if needed.
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
