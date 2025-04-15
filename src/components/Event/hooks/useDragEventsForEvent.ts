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
  const { setCurrentDraggedEventData } = useEventContext();

  const touchTimerRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    // Clear any existing state
    setCurrentDraggedEventData(undefined);
    touchTimerRef.current = setTimeout(() => {
      setCurrentDraggedEventData({ id, date });
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
    handleTouchStart,
    handleTouchEnd,
    handleDeselectItem,
    handleDragStart,
  };
};
