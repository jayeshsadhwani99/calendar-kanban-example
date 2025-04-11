import React, { useRef } from "react";
import { useCalendar } from "./contexts";
import Day from "./components/Day";
import CalendarDates from "./components/CalendarDates";
import Header from "./components/Header";
import { useActiveDateOnScroll } from "./hooks";

const App: React.FC = () => {
  const { weekDates, setActiveDate } = useCalendar();
  const mainRef = useRef<HTMLDivElement>(null);

  useActiveDateOnScroll({
    containerRef: mainRef,
    setActiveDate,
    debounceDelay: 150, // optional, defaults to 150ms.
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
    </div>
  );
};

export default App;
