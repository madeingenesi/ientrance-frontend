"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
      // Using environment variable or fallback URL
      const baseUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        "https://ambitious-cat-3135f7987e.strapiapp.com";
      const response = await axios.get(`${baseUrl}/api/events?populate=deep`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.data) {
        setEvents(response.data.data);
      }
    } catch (error: any) {
      console.error("Error details:", error.response || error);
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
