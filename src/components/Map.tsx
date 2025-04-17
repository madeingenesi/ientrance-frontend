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
    const initializeMap = () => {
      if (mapContainerRef.current && !mapElementRef.current) {
        const mapElement = document.createElement("mapplic-map");
        mapElement.setAttribute("data-json", mapData);
        mapContainerRef.current.appendChild(mapElement);
        mapElementRef.current = mapElement;
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

        // Carica il CSS
        if (!document.getElementById("mapplic-css")) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/mapplic/mapplic.css";
          link.id = "mapplic-css";
          document.head.appendChild(link);
        }

        // Carica lo script
        const script = document.createElement("script");
        script.src = "/mapplic/mapplic.js";
        script.id = "mapplic-script";
        script.async = true;

        // Attendi il caricamento dello script
        await new Promise((resolve, reject) => {
          script.onload = () => {
            resolve(true);
            // Inizializza la mappa dopo che lo script è caricato completamente
            setTimeout(initializeMap, 100);
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      } catch (error) {
        console.error("Errore nel caricamento delle risorse Mapplic:", error);
      }
    };

    loadMapplicResources();

    // Cleanup function
    return () => {
      if (mapElementRef.current) {
        mapElementRef.current.remove();
        mapElementRef.current = null;
      }
    };
  }, [mapData]);

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

  return (
    <div
      ref={mapContainerRef}
      className="mapplic-container relative w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}
