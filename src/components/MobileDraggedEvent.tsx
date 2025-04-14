import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { useEventContext } from "../contexts/EventContext";
import { formatDate, getTomorrow, getYesterday } from "../utils";
import { useCalendar } from "../contexts";

type MobileDraggedEventProps = {
  id: string;
  date: Date;
};

function MobileDraggedEvent({ id, date }: MobileDraggedEventProps) {
  const { eventsByDate, moveEvent, setCurrentDraggedEventData } =
    useEventContext();
  const event = eventsByDate?.[formatDate(date)]?.find((e) => e.id === id);
  const draggedEventRef = useRef<HTMLDivElement>(null);
  const { setActiveDate, weekDates, selectedDayIndex } = useCalendar();
  const timeoutRef = useRef<number>(undefined);

  const setDimensions = () => {
    if (!draggedEventRef.current) return;
    const eventElem = document.getElementById(`event-${id}`);
    if (eventElem) {
      const { width, height, x, y } = eventElem.getBoundingClientRect();
      draggedEventRef.current!.style.width = `${width}px`;
      draggedEventRef.current!.style.height = `${height}px`;
      draggedEventRef.current!.style.left = `${x}px`;
      draggedEventRef.current!.style.top = `${y}px`;
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.point.x < 50) {
      timeoutRef.current = setTimeout(() => {
        const activeDate = weekDates[selectedDayIndex];
        setActiveDate(getYesterday(activeDate));
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, 1000);
    } else if (info.point.x > window.innerWidth - 50) {
      timeoutRef.current = setTimeout(() => {
        const activeDate = weekDates[selectedDayIndex];
        setActiveDate(getTomorrow(activeDate));
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, 1000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  const handleDragEnd = () => {
    const activeDate = weekDates[selectedDayIndex];
    if (eventsByDate[formatDate(activeDate)]?.find((e) => e.id === id)) return;
    moveEvent(id, formatDate(date), formatDate(activeDate));
    setCurrentDraggedEventData(undefined);
  };

  useEffect(() => {
    setDimensions();

    // Update on window resize
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, [draggedEventRef.current]);

  const portalStyles: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
  };

  if (!event) return;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8, z: 10 }}
        animate={{ opacity: 1, scale: 1, z: 20 }}
        transition={{ type: "spring" }}
        id={`dragged-event-${id}`}
        drag={true}
        onClick={(e) => e.stopPropagation()}
        dragSnapToOrigin={true}
        dragConstraints={{}}
        ref={draggedEventRef}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={portalStyles}>
        <div className="shadow-sm rounded-xl overflow-hidden bg-white">
          <div>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="rounded w-full h-32 object-cover"
            />
          </div>
          <div className="p-2 text-left">
            <h1 className="!text-base font-semibold line-clamp-1">
              {event.title}
            </h1>
            <p className="!text-xs text-gray-500 line-clamp-2">
              {event.description}
            </p>
            <p className="!text-sm mt-3 line-clamp-1">{event.time}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default MobileDraggedEvent;
