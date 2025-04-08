"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axiosinstance"; // Importa l'istanza Axios

const EquipmentsContext = createContext<any>(null);

export function EquipmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [equipments, setEquipments] = useState([]);
  const [machineries, setMachineries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (
      endpoint: string,
      setter: React.Dispatch<React.SetStateAction<any>>
    ) => {
      try {
        const response = await api.get(endpoint);
        setter(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(
      "/equipments/catalog-equipment-technique-main-categories",
      setEquipments
    );
    fetchData("/equipments/catalog-equipment", setMachineries);
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
