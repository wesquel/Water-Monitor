import Aside from "../components/Aside";
import LineChart from "../components/LineChart";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-mainBlack flex">
      <Aside className="hidden lg:flex" />
      <div className="p-2 lg:p-0 w-full min-h-screen lg:h-screen lg:px-20 xl:px-28 flex flex-col justify-center">
        <div className="grid gap-9 mb-9 lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-2">
          <p className="lg:col-span-3 text-mainWhite">
            Última atualização: xx/xx/xxxx 99:99
          </p>
          <div className="lg:col-start-4 h-14 bg-secondBlack rounded-xl"></div>
        </div>
        <div className="grid gap-9 mb-9 lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-4">
          <div className="w-full h-[120px] rounded-xl bg-secondBlack">
            teste
          </div>
          <div className="w-full h-[120px] rounded-xl bg-secondBlack">
            teste
          </div>
          <div className="w-full h-[120px] rounded-xl bg-secondBlack">
            teste
          </div>
          <div className="w-full h-[120px] rounded-xl bg-secondBlack">
            teste
          </div>
        </div>
        <div className="grid-cols-1  grid-rows-chartMobile lg:grid-cols-2 grid lg:grid-rows-2 lg:w-full lg:h-[50vw] xl:h-[34vw] gap-9">
          <LineChart name="Chart 1" />
          <LineChart name="Chart 2" />
          <LineChart name="Chart 3" />
          <LineChart name="Chart 4" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
