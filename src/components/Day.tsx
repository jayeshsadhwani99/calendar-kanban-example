import { useEffect } from "react";
import { useCalendar } from "../contexts";

type DayProps = {
  date: Date;
  index: number;
};

function Day({ date }: DayProps) {
  const { activeDate } = useCalendar();

  useEffect(() => {
    const element = document.getElementById(`day-${date.toDateString()}`);
    if (element && date.toDateString() === activeDate.toDateString()) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeDate]);

  return (
    <div
      key={date.toDateString()}
      id={`day-${date.toDateString()}`}
      className="snap-start snap-always flex-shrink-0 md:flex-grow w-full md:w-auto h-full border-r last:border-r-0 bg-white">
      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-700">
        Content for {date.toDateString()}
      </div>
    </div>
  );
}

export default Day;
