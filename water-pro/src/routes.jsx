import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import Dashboard from "./screens/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
