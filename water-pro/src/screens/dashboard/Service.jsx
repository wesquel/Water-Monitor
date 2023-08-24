import { Outlet } from "react-router-dom";
import MenuService from "../../components/MenuService";

function DashboardService() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="xl:w-[55%] lg:w-[80%] w-full rounded-xl bg-secondBlack min-h-[500px] flex flex-col gap-4 lg:gap-0 lg:grid lg:grid-cols-serviceDashboardGrid p-1 m-1 lg:p-6">
        <MenuService />
        <div className="flex flex-col items-center ml-2 lg:ml-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DashboardService;
