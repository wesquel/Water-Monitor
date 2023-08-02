import { RouteObject} from "react-router-dom";
import LoginScreen from ".";

export const loginRoutes : RouteObject[] = [ 
  {
    path: "/login",
    element: <LoginScreen/>,
  },
];

