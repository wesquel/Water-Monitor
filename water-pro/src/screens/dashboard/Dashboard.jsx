import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";

function Dashboard() {
  return (
    <div className="min-h-screen bg-mainBlack flex flex-col lg:flex-row">
      <Aside className="lg:flex" />
      <div className="w-full lg:ml-[270px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
