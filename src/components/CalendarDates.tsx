import { DAY_ABBREVS } from "../constants";
import { useCalendar } from "../contexts";

function CalendarDates() {
  const { weekDates, activeDate, handleDayClick } = useCalendar();

  return (
    <div className="sticky top-0 bg-white border-b z-10 py-3 flex items-center">
      <div className="flex flex-1 justify-between relative">
        {weekDates.map((date, index) => {
          const isActive = date.toDateString() === activeDate.toDateString();
          return (
            <div
              key={date.toDateString()}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer px-2"
              onClick={() => handleDayClick(index)}>
              <span className="text-xs uppercase text-gray-500">
                {DAY_ABBREVS[index]}
              </span>
              <div className="relative mt-1 flex items-center justify-center">
                {isActive && (
                  <div className="absolute w-8 h-8 rounded-full bg-red-500" />
                )}
                <span
                  className={`z-10 text-base font-medium ${
                    isActive ? "text-white" : "text-gray-800"
                  }`}>
                  {date.getDate()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarDates;
