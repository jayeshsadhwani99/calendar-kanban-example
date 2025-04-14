import React, { ReactNode, createContext, useContext, useState } from "react";
import sampleEvents, { EventsByDate } from "../../data/demo";

interface EventContextType {
  eventsByDate: EventsByDate;
  moveEvent: (eventId: string, fromDate: string, toDate: string) => void;
  currentDraggedEventData: any;
  setCurrentDraggedEventData: (data: any) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export type EventProviderProps = {
  children: ReactNode;
};

export const EventProvider: React.FC<EventProviderProps> = ({
  children,
}: EventProviderProps) => {
  // We initialize events from your sample events data.
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>(sampleEvents);
  const [currentDraggedEventData, setCurrentDraggedEventData] =
    useState(undefined);

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
      }}>
      {children}
    </EventContext.Provider>
  );
};
