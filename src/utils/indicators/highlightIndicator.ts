import { clearHighlights, getIndicators, getNearestIndicator } from ".";

export const highlightIndicator = (e: any, date: Date) => {
  const indicators = getIndicators(date);
  clearHighlights(date);
  const el = getNearestIndicator(e, indicators);
  (el.element as HTMLElement).style.opacity = "1";
};
