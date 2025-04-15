import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useEventContext } from "../contexts/EventContext";
import { formatDate } from "../utils";

type MobileDraggedEventProps = {
  id: string;
  date: Date;
};

function MobileDraggedEvent({ id, date }: MobileDraggedEventProps) {
  const { eventsByDate, dragCoordinates } = useEventContext();
  const event = eventsByDate?.[formatDate(date)]?.find((e) => e.id === id);
  const draggedEventRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const setDimensions = () => {
    if (!draggedEventRef.current) return;
    const eventElem = document.getElementById(`event-${id}`);
    if (eventElem) {
      const { width, height, x, y } = eventElem.getBoundingClientRect();
      draggedEventRef.current!.style.width = `${width}px`;
      draggedEventRef.current!.style.height = `${height}px`;
      draggedEventRef.current!.style.left = `${x}px`;
      draggedEventRef.current!.style.top = `${y}px`;
      setCoordinates({
        x,
        y,
      });
    }
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
    position: "fixed",
    left: dragCoordinates?.x || 0,
    top: dragCoordinates?.y || 0,
    translate: dragCoordinates?.x && dragCoordinates.y ? "-50% -50%" : "",
    zIndex: 20,
  };

  if (!event) return;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8, z: 10 }}
        onContextMenu={(e) => e.preventDefault()}
        animate={{
          opacity: 1,
          scale: 1,
          z: 20,
        }}
        exit={{ opacity: 0.5, left: coordinates.x, top: coordinates.y }}
        transition={{ type: "spring" }}
        id={`dragged-event-${id}`}
        onClick={(e) => e.stopPropagation()}
        ref={draggedEventRef}
        style={portalStyles}
        className="select-none">
        <div className="shadow-lg rounded-xl overflow-hidden bg-white">
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
