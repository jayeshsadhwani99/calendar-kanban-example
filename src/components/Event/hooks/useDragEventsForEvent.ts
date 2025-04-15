import { useRef } from "react";
import { useEventContext } from "../../../contexts/EventContext";
import { TOUCH_TIMEOUT_PHONE } from "../../../constants";

export const useDragEventsForEvent = ({
  id,
  date,
}: {
  id: string;
  date: Date;
}) => {
  const eventRef = useRef<HTMLDivElement>(null);
  const { setCurrentDraggedEventData } = useEventContext();

  const touchTimerRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    // Clear any existing state
    setCurrentDraggedEventData(undefined);
    touchTimerRef.current = setTimeout(() => {
      const { x = 0, y = 0 } = eventRef.current?.getBoundingClientRect() ?? {};
      setCurrentDraggedEventData({
        id,
        date,
        x,
        y,
      });
    }, TOUCH_TIMEOUT_PHONE);
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

  const handleDragStart = () => {
    setCurrentDraggedEventData({ id, date });
  };

  return {
    eventRef,
    handleTouchStart,
    handleTouchEnd,
    handleDeselectItem,
    handleDragStart,
  };
};
