import { MONTHS } from "../constants";
import { useCalendar } from "../contexts";

function Header() {
  const { activeDate, goToPreviousWeek, goToNextWeek, handleTodayClick } =
    useCalendar();
  const month = MONTHS[activeDate.getMonth()];
  const year = activeDate.getFullYear();

  return (
    <div className="sticky top-0 bg-white border-b z-10 px-4 py-3 flex items-center gap-2">
      <button
        className="flex items-center justify-center text-sm md:text-base font-semibold py-2 px-4 hover:bg-gray-100 rounded-full transition-colors cursor-pointer border"
        onClick={handleTodayClick}
        aria-label="Today">
        Today
      </button>

      <div className="flex items-center gap-2">
        <button
          className="flex w-8 h-8 md:w-10 md:h-10 items-center justify-center text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          onClick={goToPreviousWeek}
          aria-label="Previous Week">
          ←
        </button>
        <button
          className="flex w-10 h-10 items-center justify-center text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          onClick={goToNextWeek}
          aria-label="Next Week">
          →
        </button>
      </div>
      <h2 className="font-semibold text-xl md:text-2xl">
        {month} {year}
      </h2>
    </div>
  );
}

export default Header;
