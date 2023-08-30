import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/dashboard/Dashboard";
import AllDashboardScreen from "./screens/dashboard/All";
import CardsDashboardScreen from "./screens/dashboard/Cards";
import ChartsDashboardScreen from "./screens/dashboard/Charts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
