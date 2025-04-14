import Event from "../Event";
import { formatDate } from "../../utils";
import { useDragEventsForDay } from "./hooks";

type DayProps = {
  date: Date;
  index: number;
};

function Day({ date }: DayProps) {
  const {
    eventsList,
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
  } = useDragEventsForDay(date);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      key={formatDate(date)}
      id={`day-${formatDate(date)}`}
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
          <Event
            {...event}
            key={event.id}
            date={date}
            handleDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
}

export default Day;
