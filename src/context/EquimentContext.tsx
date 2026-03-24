"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axiosinstance";
import {
  normalizeCatalogEquipmentList,
  type CatalogEquipment,
} from "@/helpers/catalogEquipment";

const EquipmentsContext = createContext<any>(null);

export function EquipmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [equipments, setEquipments] = useState([]);
  const [machineries, setMachineries] = useState<CatalogEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoriesRes, catalogRes] = await Promise.all([
          api.get("equipments/catalog-equipment-technique-main-categories"),
          api.get("equipments/catalog-equipment2"),
        ]);
        if (cancelled) return;
        setEquipments(categoriesRes.data);
        setMachineries(
          normalizeCatalogEquipmentList(catalogRes.data) as CatalogEquipment[]
        );
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load equipment";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <EquipmentsContext.Provider
      value={{ equipments, machineries, loading, error }}
    >
      {children}
    </EquipmentsContext.Provider>
  );
}

export function useEquipments() {
  return useContext(EquipmentsContext);
}
