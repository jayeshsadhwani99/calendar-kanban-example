import React, { useState } from "react";
import sampleEvents, { EventsByDate } from "../../data/demo";
import { EventProviderProps } from "./types";
import { EventContext } from "./Context";

export const EventProvider: React.FC<EventProviderProps> = ({
  children,
}: EventProviderProps) => {
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>(sampleEvents);
  const [currentDraggedEventData, setCurrentDraggedEventData] =
    useState(undefined);
  const [dragCoordinates, setDragCoordinates] = useState({ x: 0, y: 0 });

  const moveEvent = (eventId: string, fromDate: string, toDate: string) => {
    setEventsByDate((prev) => {
      const eventToMove = prev[fromDate]?.find((ev) => ev.id === eventId);
      if (!eventToMove) return prev;
      const newFromEvents = prev[fromDate].filter((ev) => ev.id !== eventId);
      let newToEvents = prev[toDate] || [];
      if (!prev[toDate]?.find((ev) => ev.id === eventId)) {
        newToEvents = prev[toDate]
          ? [eventToMove, ...prev[toDate]]
          : [eventToMove];
      }
      return {
        ...prev,
        [fromDate]: newFromEvents,
        [toDate]: newToEvents,
      };
    });
  };

  return (
    <EventContext.Provider
      value={{
        eventsByDate,
        moveEvent,
        currentDraggedEventData,
        setCurrentDraggedEventData,
        dragCoordinates,
        setDragCoordinates,
      }}>
      {children}
    </EventContext.Provider>
  );
};
