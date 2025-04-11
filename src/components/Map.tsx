"use client";
import { useEffect, useRef } from "react";

interface MapplicProps {
  mapData?: string;
}

export default function MapplicMap({
  mapData = "https://mapplic.com/getMapData?id=3tV2Zju2ySD1DNZ8i5h4",
}: MapplicProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const loadMapplicResources = async () => {
      // Carica il CSS se non è già presente
      if (!document.getElementById("mapplic-css")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/mapplic/mapplic.css";
        link.id = "mapplic-css";
        document.head.appendChild(link);
      }

      // Carica lo script se non è già presente
      if (!document.getElementById("mapplic-script")) {
        const script = document.createElement("script");
        script.src = "/mapplic/mapplic.js";
        script.id = "mapplic-script";
        script.async = true;

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        // Inizializza la mappa dopo che lo script è caricato
        if (mapContainerRef.current && !mapElementRef.current) {
          const mapElement = document.createElement("mapplic-map");
          mapElement.setAttribute("data-json", mapData);
          mapContainerRef.current.appendChild(mapElement);
          mapElementRef.current = mapElement;
        }
      }
    };

    loadMapplicResources().catch(console.error);

    // Cleanup function
    return () => {
      if (mapElementRef.current) {
        mapElementRef.current.remove();
        mapElementRef.current = null;
      }
    };
  }, [mapData]);

  return (
    <div
      ref={mapContainerRef}
      className="mapplic-container relative w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}
