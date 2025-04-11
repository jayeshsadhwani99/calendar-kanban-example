import { useEffect, useRef, useCallback, RefObject } from "react";

interface UseActiveDateOnScrollProps {
  containerRef: RefObject<HTMLElement | null>;
  setActiveDate: (date: Date) => void;
  debounceDelay?: number;
}

export function useActiveDateOnScroll({
  containerRef,
  setActiveDate,
  debounceDelay = 150,
}: UseActiveDateOnScrollProps) {
  const scrollTimeoutRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // Compute container center.
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestElem: HTMLElement | null = null;
      let minDistance = Infinity;

      // Find all elements with an id that starts with "day-".
      const dayElements = container.querySelectorAll('[id^="day-"]');
      dayElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const dayCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - dayCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestElem = el as HTMLElement;
        }
      });

      if (closestElem) {
        // Remove the "day-" prefix and trim the string.
        const dateString = (closestElem as HTMLElement).id
          .replace("day-", "")
          .trim();
        const newActiveDate = new Date(dateString);
        setActiveDate(newActiveDate);
      }
    }, debounceDelay);
  }, [containerRef, setActiveDate, debounceDelay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create an AbortController to manage the event listener.
    const controller = new AbortController();
    const signal = controller.signal;

    container.addEventListener("scroll", handleScroll, { signal });

    // Cleanup: abort the event listener and clear the timeout.
    return () => {
      controller.abort();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [containerRef, handleScroll]);
}
