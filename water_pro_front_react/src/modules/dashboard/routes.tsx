import { RouteObject} from "react-router-dom";
import DashboardScreen from ".";

export const dashboardRoutes : RouteObject[] = [ 
  {
    path: "/dashboard",
    element: <DashboardScreen/>,
  },
];

