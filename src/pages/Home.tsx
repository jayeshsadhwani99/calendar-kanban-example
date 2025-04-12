import Header from "../components/Header";
import CalendarDates from "../components/CalendarDates";
import { useCalendar } from "../contexts";
import { useRef } from "react";
import Day from "../components/Day";
import { useParams } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import { AnimatePresence } from "motion/react";
import WeekChangeScrollAnimation from "../components/Animations/WeekChangeScrollAnimation";

function Home() {
  const { id } = useParams();
  const { weekDates } = useCalendar();
  const mainRef = useRef<HTMLDivElement>(null);

  // useActiveDateOnScroll({
  //   containerRef: mainRef,
  // });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      <Header />
      <CalendarDates />
      <WeekChangeScrollAnimation>
        <div
          ref={mainRef}
          className="relative flex-1 overflow-hidden h-full flex md:grid md:grid-cols-7 overflow-x-auto md:overflow-hidden scroll-smooth snap-x snap-mandatory">
          <div
            data-buffer="left"
            className="w-10 flex-shrink-0 md:hidden"
            aria-hidden="true"
          />
          {weekDates.map((date, index) => (
            <Day date={date} key={index} index={index} />
          ))}
          <div
            data-buffer="right"
            className="w-10 flex-shrink-0 md:hidden"
            aria-hidden="true"
          />
        </div>
      </WeekChangeScrollAnimation>

      <AnimatePresence>{id && <EventDetails id={id} />}</AnimatePresence>
    </div>
  );
}

export default Home;
