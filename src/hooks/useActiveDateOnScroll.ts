import { useCalendar } from "../contexts";
import { AnimationControls } from "motion/react";
import { formatDate } from "../utils";
import { DRAG_DAY_THRESHOLD } from "../constants";

interface UseActiveDateOnScrollProps {
  containerRef: React.RefObject<HTMLElement | null>;
  controls: AnimationControls;
}

export function useActiveDateOnScroll({
  containerRef,
  controls,
}: UseActiveDateOnScrollProps) {
  const {
    weekDates,
    selectedDayIndex,
    handleDayClick,
    goToNextWeek,
    goToPreviousWeek,
  } = useCalendar();

  const handleDragEnd = async (_: any, info: any) => {
    if (!containerRef.current) return;

    // Get the active day element based on current selected day.
    const activeDay = formatDate(weekDates[selectedDayIndex]);
    const dayElem = containerRef.current.querySelector(
      `[id="day-${activeDay}"]`,
    );
    if (!dayElem) return;

    const dayWidth = dayElem.getBoundingClientRect().width;
    const threshold = dayWidth * DRAG_DAY_THRESHOLD;
    const xOffset = info.offset.x;

    // If the drag offset is less than half the day width, snap back to the current day.
    if (Math.abs(xOffset) < threshold) {
      const targetX = -selectedDayIndex * dayWidth;
      await controls.start({
        x: targetX,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
      return;
    }

    let targetIndex = selectedDayIndex;

    if (xOffset > 0) {
      // Dragged right: move to the previous day.
      targetIndex = selectedDayIndex - 1;
      if (selectedDayIndex === 0) {
        // If at the start of the week, jump to the previous week.
        goToPreviousWeek();
        return;
      }
    } else if (xOffset < 0) {
      // Dragged left: move to the next day.
      targetIndex = selectedDayIndex + 1;
      if (selectedDayIndex === weekDates.length - 1) {
        // If at the end of the week, jump to the next week.
        goToNextWeek();
        return;
      }
    }

    targetIndex = Math.min(Math.max(targetIndex, 0), weekDates.length - 1);

    handleDayClick(targetIndex);
  };

  return { handleDragEnd };
}
