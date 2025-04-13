import { useCalendar } from "../contexts";
import { AnimationControls } from "motion/react";

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
    const activeDay = weekDates[selectedDayIndex].toDateString();
    // Determine day width by getting the first day element
    const dayElem = containerRef.current.querySelector(
      `[id="day-${activeDay}"]`,
    );
    if (!dayElem) return;
    const dayWidth = dayElem.getBoundingClientRect().width;
    const threshold = dayWidth / 2;
    // info.offset.x is the total drag offset from the starting position.
    const xOffset = info.offset.x;

    // Calculate a target day index. Negative offsets (left drag) push the container left.
    let targetIndex = xOffset > 0 ? selectedDayIndex - 1 : selectedDayIndex + 1;
    targetIndex = Math.min(Math.max(targetIndex, 0), weekDates.length - 1);

    // If dragging from the left edge far enough (i.e. active index 0 and dragged right), go to previous week.
    if (targetIndex === 0 && xOffset > threshold && selectedDayIndex === 0) {
      goToPreviousWeek();
      // Snap to the last day (index = weekDates.length - 1) of the new week.
      await controls.start({
        x: -((weekDates.length - 1) * dayWidth),
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
      return;
    }
    // If dragging from the right edge far enough (i.e. active index at last day and dragged left), go to next week.
    if (
      targetIndex === weekDates.length - 1 &&
      xOffset < -threshold &&
      selectedDayIndex === weekDates.length - 1
    ) {
      goToNextWeek();
      await controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
      return;
    }
    // Otherwise, snap to the nearest day.
    const targetX = -targetIndex * dayWidth;
    await controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
    handleDayClick(targetIndex);
  };

  return { handleDragEnd };
}
