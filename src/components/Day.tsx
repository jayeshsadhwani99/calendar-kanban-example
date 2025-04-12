import { useEffect } from "react";
import { useCalendar } from "../contexts";
import Event from "./Event";
import { getEventsForDate } from "../utils";

type DayProps = {
  date: Date;
  index: number;
};

function Day({ date }: DayProps) {
  const { selectedDayIndex } = useCalendar();

  const eventsList = getEventsForDate(date);

  useEffect(() => {
    const element = document.getElementById(`day-${date.toDateString()}`);
    if (element && date.getDay() === selectedDayIndex) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDayIndex]);

  return (
    <div
      key={date.toDateString()}
      id={`day-${date.toDateString()}`}
      className={`relative ${
        eventsList?.length === 0 ? "h-full" : "h-fit md:h-full"
      } flex items-center justify-center snap-start snap-always flex-shrink-0 md:flex-grow w-full md:w-auto border-r last:border-r-0 bg-white p-2`}>
      {eventsList?.length === 0 && (
        <p className="flex items-center justify-center text-xs text-gray-500 font-normal text-center h-full">
          No schedule found for <br />
          {date.toDateString()}
        </p>
      )}
      <div className="flex flex-col gap-4 py-2">
        {eventsList.map((event) => (
          <Event {...event} />
        ))}
      </div>
    </div>
  );
}

export default Day;
