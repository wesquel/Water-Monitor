import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/dashboard/Dashboard";
import AllDashboardScreen from "./screens/dashboard/All";
import CardsDashboardScreen from "./screens/dashboard/Cards";
import ChartsDashboardScreen from "./screens/dashboard/Charts";
import { RequireAuth, RequireNoAuth } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireNoAuth>
        <Home />
      </RequireNoAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <RequireNoAuth>
        <Login />
      </RequireNoAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <RequireNoAuth>
        <Register />
      </RequireNoAuth>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth value="/login">
        <Dashboard />
      </RequireAuth>
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
