import { useEffect, useRef } from "react";
import { useCalendar } from "../contexts";

type DayProps = {
  date: Date;
  index: number;
};

function Day({ date, index }: DayProps) {
  const { selectedDayIndex } = useCalendar();

  // Refs for day containers (for mobile scroll snapping)
  const dayRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (window.innerWidth < 768 && dayRefs.current[selectedDayIndex]) {
      dayRefs.current[selectedDayIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [selectedDayIndex]);

  return (
    <div
      key={date.toDateString()}
      ref={(el) => {
        dayRefs.current[index] = el;
      }}
      className="snap-start snap-always flex-shrink-0 md:flex-grow w-screen md:w-auto h-full border-r last:border-r-0 bg-white">
      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-700">
        Content for {date.toDateString()}
      </div>
    </div>
  );
}

export default Day;
