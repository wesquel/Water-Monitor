import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";

function Dashboard() {
  return (
    <div className="min-h-screen bg-mainBlack flex">
      <Aside className="hidden lg:flex" />
      <div className="w-full lg:ml-[270px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
