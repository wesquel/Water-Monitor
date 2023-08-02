import { RouteObject} from "react-router-dom";
import HomeScreen from ".";

export const homeRoutes : RouteObject[] = [ 
  {
    path: "/",
    element: <HomeScreen/>,
  },
];

