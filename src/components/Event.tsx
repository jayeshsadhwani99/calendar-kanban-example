import { useRef } from "react";
import { Event as EventType } from "../data/demo";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DropIndicator from "./DropIndicator";
import { formatDate, getTomorrow, getYesterday, isMobile } from "../utils";
import { useCalendar } from "../contexts";

const OFFSET_THRESHOLD = 50;
const DRAG_DELAY = 1500;

function Event(props: EventType & { date: Date; handleDragStart: any }) {
  const { id, title, description, imageUrl, time, date, handleDragStart } =
    props;
  const { setActiveDate, selectedDayIndex, weekDates } = useCalendar();

  const eventRef = useRef<HTMLDivElement | null>(null);
  const dragTimerRef = useRef<number | null>(null);

  const handleDrag = (_: any, info: any) => {
    if (!eventRef.current) return;
    const offset = window.innerWidth - info.point.x;
    const date = weekDates[selectedDayIndex];

    if (info.point.x < OFFSET_THRESHOLD) {
      setTimeout(() => {
        setActiveDate(getYesterday(date));
        if (dragTimerRef.current) clearTimeout(dragTimerRef.current);
        dragTimerRef.current = null;
      }, DRAG_DELAY);
    }

    if (offset < OFFSET_THRESHOLD) {
      setTimeout(() => {
        setActiveDate(getTomorrow(date));
        if (dragTimerRef.current) clearTimeout(dragTimerRef.current);
        dragTimerRef.current = null;
      }, DRAG_DELAY);
    }
  };

  const handleDragEnd = () => {
    if (!dragTimerRef.current) return;
    clearTimeout(dragTimerRef.current);
    dragTimerRef.current = null;
  };

  return (
    <Link to={`/${id}`}>
      <DropIndicator day={formatDate(date)} />
      <motion.div
        ref={eventRef}
        id={id}
        draggable={!isMobile}
        drag={isMobile}
        dragConstraints={{}}
        onDragStart={(e) => handleDragStart(e, id, date)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        layoutId={`event-container-${id}`}
        className={`relative group flex flex-col shadow-sm rounded-xl overflow-hidden cursor-pointer active:cursor-grabbing z-[100]`}>
        <motion.div layout layoutId={`event-image-container-${id}`}>
          <img
            src={imageUrl}
            draggable={false}
            alt={title}
            className="rounded w-full h-32 object-cover group-hover:scale-105 transition-transform"
          />
        </motion.div>
        <motion.div
          layoutId={`info-container-${id}`}
          layout="position"
          className="p-2 text-left">
          <h1 className="!text-base font-semibold line-clamp-1">{title}</h1>
          <p className="!text-xs text-gray-500 line-clamp-2">{description}</p>
          <p className="!text-sm mt-3 line-clamp-1">{time}</p>
        </motion.div>
      </motion.div>
      <DropIndicator day={formatDate(date)} />
    </Link>
  );
}

export default Event;
