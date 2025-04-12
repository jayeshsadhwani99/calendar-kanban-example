import Header from "../components/Header";
import CalendarDates from "../components/CalendarDates";
import { useCalendar } from "../contexts";
import { useRef } from "react";
import { useActiveDateOnScroll } from "../hooks";
import Day from "../components/Day";
import { AnimatePresence } from "motion/react";
import { useParams } from "react-router-dom";
import EventDetails from "../components/EventDetails";

function Home() {
  const { id } = useParams();
  const { weekDates } = useCalendar();
  const mainRef = useRef<HTMLDivElement>(null);

  useActiveDateOnScroll({
    containerRef: mainRef,
    debounceDelay: 150,
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      <Header />
      <CalendarDates />
      <main
        ref={mainRef}
        className="relative flex-1 overflow-hidden h-full flex md:grid md:grid-cols-7 overflow-x-auto md:overflow-hidden scroll-smooth snap-x snap-mandatory">
        {weekDates.map((date, index) => (
          <Day date={date} key={index} index={index} />
        ))}
      </main>
      <AnimatePresence>{id && <EventDetails id={id} />}</AnimatePresence>
    </div>
  );
}

export default Home;
