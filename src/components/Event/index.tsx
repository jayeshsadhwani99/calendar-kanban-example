// Event.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useEventContext } from "../../contexts/EventContext";
import { isMobile, formatDate } from "../../utils";
import DropIndicator from "../DropIndicator";
import { useDragEventsForEvent } from "./hooks";

function Event(props: any & { date: Date }) {
  const { id, title, description, imageUrl, time, date } = props;
  const navigate = useNavigate();
  const { currentDraggedEventData } = useEventContext();
  const {
    handleDeselectItem,
    handleTouchStart,
    handleTouchEnd,
    handleDragStart,
    eventRef,
  } = useDragEventsForEvent({ id, date });

  const navigateToEvent = () => {
    navigate(`/${id}`);
  };

  return (
    <>
      <DropIndicator day={formatDate(date)} />
      <motion.div
        ref={eventRef}
        id={`event-${id}`}
        onClick={navigateToEvent}
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchCancel={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        onBlur={handleDeselectItem}
        onDragStart={handleDragStart}
        onDragEnd={handleTouchEnd}
        draggable={!isMobile}
        layoutId={`event-container-${id}`}
        className={`relative group flex flex-col ${
          isMobile ? "" : "shadow-sm"
        } ${
          currentDraggedEventData?.id === id && isMobile ? "!opacity-50" : ""
        } rounded-xl overflow-hidden cursor-pointer active:cursor-grabbing z-10 select-none touch-none max-w-full`}>
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
    </>
  );
}

export default Event;
