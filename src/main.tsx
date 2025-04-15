import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CalendarProvider } from "./contexts";
import { EventProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CalendarProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </CalendarProvider>
  </StrictMode>,
);
