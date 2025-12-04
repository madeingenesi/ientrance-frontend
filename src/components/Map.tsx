"use client";
import { useEffect, useRef, useState } from "react";

interface MapplicProps {
  mapData?: string;
}

export default function MapplicMap({
  mapData = "https://mapplic.com/getMapData?id=3tV2Zju2ySD1DNZ8i5h4",
}: MapplicProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLElement | null>(null);
  const [isValidJson, setIsValidJson] = useState<boolean | null>(null);
  const [validMapData, setValidMapData] = useState<string | null>(null);

  useEffect(() => {
    // Validate and fetch map data
    const validateMapData = async () => {
      try {
        const response = await fetch(mapData);
        const text = await response.text();

        // Try to parse as JSON
        try {
          const json = JSON.parse(text);
          setIsValidJson(true);
          setValidMapData(mapData);
        } catch (parseError) {
          console.error("Invalid JSON response from map API:", text);
          setIsValidJson(false);
          setValidMapData(null);
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsValidJson(false);
        setValidMapData(null);
      }
    };

    validateMapData();
  }, [mapData]);

  useEffect(() => {
    const initializeMap = () => {
      if (mapContainerRef.current && !mapElementRef.current && validMapData) {
        const mapElement = document.createElement("mapplic-map");
        mapElement.id = "ientrance-map";
        mapElement.setAttribute("data-json", validMapData);
        mapContainerRef.current.appendChild(mapElement);
        mapElementRef.current = mapElement;

        // Listen for mapReady event as per Mapplic documentation
        mapElement.addEventListener("mapReady", () => {
          console.log("Mapplic map ready");
        });
      }
    };

    const loadMapplicResources = async () => {
      try {
        // Rimuovi script e mappa esistenti
        const existingScript = document.getElementById("mapplic-script");
        if (existingScript) {
          existingScript.remove();
        }
        if (mapElementRef.current) {
          mapElementRef.current.remove();
          mapElementRef.current = null;
        }

        // Carica il CSS locale (se disponibile) o usa quello di Mapplic
        if (!document.getElementById("mapplic-css")) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/mapplic/mapplic.css";
          link.id = "mapplic-css";
          document.head.appendChild(link);
        }

        // Usa lo script CDN di Mapplic come da documentazione
        const script = document.createElement("script");
        script.src = "https://mapplic.com/mapplic.js";
        script.type = "text/javascript";
        script.id = "mapplic-script";
        script.async = true;

        // Attendi il caricamento dello script
        await new Promise((resolve, reject) => {
          script.onload = () => {
            resolve(true);
            // Inizializza la mappa dopo che lo script è caricato completamente
            // Solo se abbiamo dati validi
            if (validMapData) {
              setTimeout(initializeMap, 100);
            }
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      } catch (error) {
        console.error("Errore nel caricamento delle risorse Mapplic:", error);
      }
    };

    if (validMapData) {
      loadMapplicResources();
    }

    // Cleanup function
    return () => {
      if (mapElementRef.current) {
        mapElementRef.current.remove();
        mapElementRef.current = null;
      }
    };
  }, [validMapData]);

  // Aggiungi un gestore per il routing di Next.js
  useEffect(() => {
    const handleRouteChange = () => {
      if (mapElementRef.current) {
        mapElementRef.current.remove();
        mapElementRef.current = null;
      }
    };

    // Aggiungi listener per la navigazione
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  if (isValidJson === false) {
    return (
      <div
        className="relative w-full h-full col-span-12 md:col-span-6 flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center p-8">
          <p className="text-gray-600 mb-2">Map data unavailable</p>
          <p className="text-sm text-gray-500">
            The map service may have expired or is temporarily unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="mapplic-container relative w-full h-full col-span-12 md:col-span-6"
      style={{ minHeight: "400px" }}
    />
  );
}
