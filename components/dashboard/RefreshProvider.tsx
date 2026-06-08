"use client";

import { createContext, useState, useContext } from "react";

interface RefreshContextType {
  refreshKey: number;
  refresh: () => void;
}

const RefreshContext = createContext<RefreshContextType>({
  refreshKey: 0,
  refresh: () => {},
});

export const RefreshProvider = ({ children }: { children: React.ReactNode }) =>  {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <RefreshContext.Provider value={{ refreshKey, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = () => {
  return useContext(RefreshContext);
}