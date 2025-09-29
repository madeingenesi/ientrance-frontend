"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFromStrapi } from "@/lib/config";

// Define an interface for the context type
interface EventsContextType {
  events: any[];
  isLoading: boolean;
  error: any;
}

// Initialize the context with a default value
const Context = createContext<EventsContextType>({
  events: [],
  isLoading: false,
  error: null,
});

// Provider for events
export function EventsContext({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching events...");
      const data = await fetchFromStrapi("/api/events?populate=*");
      if (data && data.data) {
        setEvents(data.data);
      }
    } catch (error: any) {
      console.error("Error details:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const value = {
    events,
    isLoading,
    error,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Custom hook with check
export function useEventsContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsContext");
  }
  return context;
}
