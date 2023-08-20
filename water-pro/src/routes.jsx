import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard/Dashboard";
import AllDashboardScreen from "./screens/dashboard/All";
import CardsDashboardScreen from "./screens/dashboard/Cards";
import ChartsDashboardScreen from "./screens/dashboard/Charts";
import { DashboardSelectProvider } from "./context/DashboardSelectContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardSelectProvider>
        <Dashboard />
      </DashboardSelectProvider>
    ),
    children: [
      {
        path: "",
        element: <AllDashboardScreen />,
      },
      {
        path: "cards",
        element: <CardsDashboardScreen />,
      },
      {
        path: "charts",
        element: <ChartsDashboardScreen />,
      },
    ],
  },
]);

export default router;
