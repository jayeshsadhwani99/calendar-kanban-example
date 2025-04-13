import { getIndicators } from ".";

export const clearHighlights = (date: Date) => {
  const indicators = getIndicators(date);

  indicators.forEach((i) => {
    (i as HTMLElement).style.opacity = "0";
  });
};
