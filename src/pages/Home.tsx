import Header from "../components/Header";
import CalendarDates from "../components/CalendarDates";
import { useCalendar } from "../contexts";
import { useRef } from "react";
import Day from "../components/Day";
import { useParams } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import { AnimatePresence } from "motion/react";
import WeekChangeScrollAnimation from "../components/Animations/WeekChangeScrollAnimation";
import { useActiveDateOnScroll } from "../hooks";

function Home() {
  const { id } = useParams();
  const { weekDates } = useCalendar();
  const mainRef = useRef<HTMLDivElement>(null);

  useActiveDateOnScroll({
    containerRef: mainRef,
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      <Header />

      <CalendarDates />
      <div className="flex-1 overflow-auto relative scroll-smooth snap-x snap-mandatory">
        <WeekChangeScrollAnimation>
          <div ref={mainRef} className="flex h-full md:grid md:grid-cols-7">
            <div
              data-buffer="left"
              className="w-10 flex shrink-0 md:hidden"
              aria-hidden="true"
            />
            {weekDates.map((date, index) => (
              <Day date={date} key={index} index={index} />
            ))}
            <div
              data-buffer="right"
              className="w-0 flex shrink-0 md:hidden"
              aria-hidden="true"
            />
          </div>
        </WeekChangeScrollAnimation>
      </div>

      <AnimatePresence>{id && <EventDetails id={id} />}</AnimatePresence>
    </div>
  );
}

export default Home;
