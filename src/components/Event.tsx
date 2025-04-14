import { useRef } from "react";
import { Event as EventType } from "../data/demo";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DropIndicator from "./DropIndicator";
import { formatDate, isMobile } from "../utils";
import { useEventContext } from "../contexts/EventContext";

function Event(props: EventType & { date: Date; handleDragStart: any }) {
  const { id, title, description, imageUrl, time, date } = props;
  const { currentDraggedEventData, setCurrentDraggedEventData } =
    useEventContext();

  const eventRef = useRef<HTMLDivElement | null>(null);
  const touchTimerRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    setCurrentDraggedEventData(undefined);
    touchTimerRef.current = setTimeout(() => {
      setCurrentDraggedEventData({
        id,
        date,
      });
    }, 2000);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  const handleDeselectItem = () => {
    setCurrentDraggedEventData(undefined);
  };

  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      to={`/${id}`}
      className="select-none touch-none">
      <DropIndicator day={formatDate(date)} />
      <motion.div
        ref={eventRef}
        id={`event-${id}`}
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchCancel={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        onBlur={handleDeselectItem}
        draggable={!isMobile}
        layoutId={`event-container-${id}`}
        className={`relative group flex flex-col ${
          isMobile ? "" : "shadow-sm"
        } ${
          currentDraggedEventData?.id === id ? "!opacity-50" : ""
        } rounded-xl overflow-hidden cursor-pointer active:cursor-grabbing z-10 select-none touch-none`}>
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
