import { createContext, useState } from "react";

export const DashboardSelectContext = createContext([]);

export function DashboardSelectProvider({ children }) {
  const [dashboardSelected, setDashboardSelected] = useState("caixa");
  return (
    <DashboardSelectContext.Provider
      value={{ dashboardSelected, setDashboardSelected }}
    >
      {children}
    </DashboardSelectContext.Provider>
  );
}
