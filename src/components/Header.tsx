import { DAY_ABBREVS } from "../constants";
import { useCalendar } from "../contexts";

function Header() {
  const {
    weekDates,
    activeDate,
    handleDayClick,
    goToPreviousWeek,
    goToNextWeek,
  } = useCalendar();

  return (
    <header className="sticky top-0 bg-white border-b z-10 px-4 py-3 shadow-sm flex items-center">
      <button
        className="hidden md:flex text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={goToPreviousWeek}
        aria-label="Previous Week">
        ←
      </button>
      <div className="flex flex-1 justify-between relative">
        {weekDates.map((date, index) => {
          const isActive = date.toDateString() === activeDate.toDateString();
          return (
            <div
              key={date.toDateString()}
              className="flex flex-col items-center cursor-pointer px-2"
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
      <button
        className="hidden md:flex text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={goToNextWeek}
        aria-label="Next Week">
        →
      </button>
    </header>
  );
}

export default Header;
