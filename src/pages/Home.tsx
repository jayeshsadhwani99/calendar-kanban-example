import Header from "../components/Header";
import CalendarDates from "../components/CalendarDates";
import { useCalendar } from "../contexts";
import { useEffect, useRef } from "react";
import Day from "../components/Day";
import { useParams } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import WeekChangeScrollAnimation from "../components/Animations/WeekChangeScrollAnimation";
import { isMobile } from "../utils";
import { useActiveDateOnScroll } from "../hooks";
import { useEventContext } from "../contexts/EventContext";
import MobileDraggedEvent from "../components/MobileDraggedEvent";

function Home() {
  const { id } = useParams();
  const { weekDates, selectedDayIndex } = useCalendar();
  const { currentDraggedEventData, setCurrentDraggedEventData } =
    useEventContext();

  const mainRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { handleDragEnd } = useActiveDateOnScroll({
    containerRef: mainRef,
    controls,
  });

  // When the active day changes, animate the container to that day's position.
  useEffect(() => {
    if (isMobile && mainRef.current) {
      // Assume all day elements are the same width. Get the width from the first day element.
      const dayElem = mainRef.current.querySelector(`[id^="day-"]`);
      if (dayElem) {
        const dayWidth = dayElem.getBoundingClientRect().width;
        controls.start({
          x: -selectedDayIndex * dayWidth,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      }
    }
  }, [selectedDayIndex, controls]);

  const handleDeselectItem = () => {
    setCurrentDraggedEventData(undefined);
  };

  return (
    <div
      onClick={handleDeselectItem}
      className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      <Header />
      <CalendarDates />
      <div className="flex-1 overflow-auto overflow-x-hidden">
        {isMobile ? (
          <motion.div
            ref={mainRef}
            className="flex h-full md:hidden"
            drag={currentDraggedEventData?.id ? undefined : "x"}
            animate={controls}
            onDragEnd={handleDragEnd}>
            {weekDates.map((date, index) => (
              <Day date={date} key={index} index={index} />
            ))}
          </motion.div>
        ) : (
          <WeekChangeScrollAnimation>
            <div ref={mainRef} className="h-full hidden md:grid md:grid-cols-7">
              {/** Desktop layout remains unchanged */}
              {weekDates.map((date, index) => (
                <Day date={date} key={index} index={index} />
              ))}
            </div>
          </WeekChangeScrollAnimation>
        )}
      </div>
      <AnimatePresence>{id && <EventDetails id={id} />}</AnimatePresence>
      {currentDraggedEventData?.id && isMobile && (
        <MobileDraggedEvent {...currentDraggedEventData} />
      )}
    </div>
  );
}

export default Home;
