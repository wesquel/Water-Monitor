import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/dashboard/Dashboard";
import AllDashboardScreen from "./screens/dashboard/All";
import CardsDashboardScreen from "./screens/dashboard/Cards";
import ChartsDashboardScreen from "./screens/dashboard/Charts";
import { DashboardSelectProvider } from "./context/DashboardSelectContext";
import DashboardService from "./screens/dashboard/Service";
import User from "./components/dashboardSections/service/User";
import Users from "./components/dashboardSections/service/Users";
import ChangePassword from "./components/dashboardSections/service/ChangePassword";

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
      {
        path: "service",
        element: <DashboardService />,
        children: [
          {
            path: "user",
            element: <User />,
          },
          {
            path: "changepassword",
            element: <ChangePassword />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

export default router;
