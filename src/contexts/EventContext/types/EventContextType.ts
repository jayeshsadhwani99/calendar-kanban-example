import { EventsByDate } from "../../../data/demo";

export interface EventContextType {
  eventsByDate: EventsByDate;
  moveEvent: (eventId: string, fromDate: string, toDate: string) => void;
  currentDraggedEventData: any;
  setCurrentDraggedEventData: (data: any) => void;
  dragCoordinates: { x: number; y: number };
  setDragCoordinates: (coordinates: { x: number; y: number }) => void;
}
