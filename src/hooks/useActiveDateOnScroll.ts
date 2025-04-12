import { useEffect } from "react";
import { useCalendar } from "../contexts";
import { isMobile } from "../utils";

interface UseActiveDateOnScrollProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useActiveDateOnScroll({
  containerRef,
}: UseActiveDateOnScrollProps) {
  const { setActiveDate, goToPreviousWeek, goToNextWeek, weekStart } =
    useCalendar();

  const setupBufferObserver = () => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const leftBuffer = container.querySelector('div[data-buffer="left"]');
    const rightBuffer = container.querySelector('div[data-buffer="right"]');

    if (!leftBuffer || !rightBuffer) return;

    const bufferObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a buffer element is fully visible, trigger a week change.
          if (entry.intersectionRatio === 1) {
            if (entry.target.getAttribute("data-buffer") === "left") {
              goToPreviousWeek();
            } else if (entry.target.getAttribute("data-buffer") === "right") {
              goToNextWeek();
            }
          }
        });
      },
      {
        root: container,
        threshold: 1.0, // Fully visible
      },
    );
    bufferObserver.observe(leftBuffer);
    bufferObserver.observe(rightBuffer);

    return bufferObserver;
  };

  const setupDayObserver = () => {
    const container = containerRef.current;
    if (!container) return;

    // Observe day elements (they have IDs that start with "day-").
    const dayElements = container.querySelectorAll('[id^="day-"]');

    const dayObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a day is mostly visible, make it the active date.
          if (entry.intersectionRatio >= 0.8) {
            const dateString = entry.target.id.replace("day-", "").trim();
            const newActiveDate = new Date(dateString);
            setActiveDate(newActiveDate);
          }
        });
      },
      {
        root: container,
        threshold: 0.8,
      },
    );

    dayElements.forEach((el) => dayObserver.observe(el));

    return dayObserver;
  };

  // useEffect(() => {
  //   const bufferObserver = setupBufferObserver();
  //   // const dayObserver = setupDayObserver();

  //   return () => {
  //     // if (dayObserver) dayObserver.disconnect();
  //     if (bufferObserver) bufferObserver.disconnect();
  //   };
  // }, [containerRef, weekStart.toDateString()]);
}
