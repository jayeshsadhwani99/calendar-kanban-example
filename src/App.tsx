import React, { useRef, useEffect, useCallback } from "react";
import { useCalendar } from "./contexts";
import Day from "./components/Day";
import CalendarDates from "./components/CalendarDates";
import Header from "./components/Header";

const App: React.FC = () => {
  const {
    weekDates,
    selectedDayIndex,
    handleDayClick,
    goToPreviousWeek,
    goToNextWeek,
  } = useCalendar();

  // Ref for the scroll container holding day views
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // Ref to debounce the scroll handler
  const scrollTimeoutRef = useRef<number | null>(null);

  // Update scroll position when week changes or selected day changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const dayWidth = container.offsetWidth;
      container.scrollTo({
        left: selectedDayIndex * dayWidth,
        behavior: "smooth",
      });
    }
  }, [selectedDayIndex]);

  // Handle scroll-end (debounced) in the scroll container.
  const handleScrollEnd = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const dayWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    let computedIndex = Math.round(scrollLeft / dayWidth);

    // Limit change to one day at a time
    if (computedIndex > selectedDayIndex + 1) {
      computedIndex = selectedDayIndex + 1;
    } else if (computedIndex < selectedDayIndex - 1) {
      computedIndex = selectedDayIndex - 1;
    }

    if (computedIndex < 0) {
      goToPreviousWeek();
    } else if (computedIndex > 6) {
      goToNextWeek();
    } else if (computedIndex !== selectedDayIndex) {
      handleDayClick(computedIndex);
    }
    container.scrollTo({
      left: computedIndex * dayWidth,
      behavior: "smooth",
    });
  }, [selectedDayIndex, goToPreviousWeek, goToNextWeek, handleDayClick]);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      handleScrollEnd();
    }, 100);
  }, [handleScrollEnd]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <CalendarDates />

      {/* Main content area with day views */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full flex md:grid md:grid-cols-7 overflow-x-auto md:overflow-hidden snap-x snap-mandatory scroll-smooth">
            {weekDates.map((date, index) => (
              <Day date={date} key={index} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
