"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllStrapiPages } from "@/lib/fetchAllStrapiPages";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const getEvents = async () => {
      try {
        const data = await fetchAllStrapiPages("/api/events?populate=*", {
          isCancelled: () => cancelled,
        });
        if (!cancelled) setEvents(data);
      } catch (error: any) {
        if (cancelled) return;
        console.error("Error details:", error);
        setError(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    getEvents();
    return () => {
      cancelled = true;
    };
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
