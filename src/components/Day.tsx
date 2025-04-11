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
      className="flex items-center justify-center snap-start snap-always flex-shrink-0 md:flex-grow w-full md:w-auto h-full border-r last:border-r-0 bg-white p-2">
      <p className="text-xs text-gray-500 font-normal text-center">
        No schedule found for <br />
        {date.toDateString()}
      </p>
    </div>
  );
}

export default Day;
