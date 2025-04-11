import { MONTHS } from "../constants";
import { useCalendar } from "../contexts";

function Header() {
  const { activeDate, goToPreviousWeek, goToNextWeek } = useCalendar();
  const month = MONTHS[activeDate.getMonth()];
  const year = activeDate.getFullYear();

  return (
    <div className="sticky top-0 bg-white border-b z-10 px-4 py-3 flex items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          className="flex w-10 h-10 items-center justify-center text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
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
      <h2 className="font-semibold text-2xl">
        {month} {year}
      </h2>
    </div>
  );
}

export default Header;
