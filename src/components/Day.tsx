import { useEffect } from "react";
import { useCalendar } from "../contexts";
import Event from "./Event";
import events from "../data/demo";
import { motion } from "motion/react";

type DayProps = {
  date: Date;
  index: number;
};

function Day({ date }: DayProps) {
  const { activeDate } = useCalendar();

  const eventsList =
    activeDate.toDateString() === date.toDateString()
      ? Object.values(events)[1]
      : [];

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
    <motion.div
      layout
      key={date.toDateString()}
      id={`day-${date.toDateString()}`}
      className="relative flex items-center justify-center snap-start snap-always flex-shrink-0 md:flex-grow w-full md:w-auto h-full border-r last:border-r-0 bg-white p-2 overflow-y-auto">
      {eventsList?.length === 0 && (
        <p className="text-xs text-gray-500 font-normal text-center">
          No schedule found for <br />
          {date.toDateString()}
        </p>
      )}
      <motion.div className="flex flex-col gap-4 py-2">
        {eventsList.map((event) => (
          <Event {...event} key={event.id} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Day;
