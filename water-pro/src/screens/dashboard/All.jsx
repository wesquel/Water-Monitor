import { useContext } from "react";
import { DashboardSelectContext } from "../../context/DashboardSelectContext";
import MedioAllDashboardSection from "../../components/dashboardSections/all/MedioAllDashboardSection";
import CaixaAllDashboardSection from "../../components/dashboardSections/all/CaixaAllDashboardSection";

function AllDashboardScreen() {
  const { dashboardSelected } = useContext(DashboardSelectContext);
  return (
    (dashboardSelected === "caixa" && <CaixaAllDashboardSection />) ||
    (dashboardSelected === "medio" && <MedioAllDashboardSection />)
  );
}

export default AllDashboardScreen;
