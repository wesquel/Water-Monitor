import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactComponent as Avatar } from "../assets/avatar.svg";
import { ReactComponent as Service } from "../assets/service.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { ReactComponent as CardSvg } from "../assets/card.svg";
import { ReactComponent as DashboardSvg } from "../assets/dashboard.svg";
import { ReactComponent as ChartSvg } from "../assets/chart.svg";
import DashboardButton from "./DashboardButton";
import { Link } from "react-router-dom";

function Aside({ className }) {
  const [selected, setSelected] = useState("all");
  return (
    <aside
      className={twMerge(
        "w-[270px] h-screen bg-secondBlack flex flex-col items-center py-14 px-5 gap-3 fixed",
        className
      )}
    >
      <Avatar />
      <span className="text-mainWhite">João Pedro</span>
      <div className="flex gap-4 items-center">
        <Service className="w-6 cursor-pointer text-mainWhite hover:text-mainBlue transition-colors" />
        <Logout className="w-6 cursor-pointer text-mainWhite hover:text-mainBlue transition-colors" />
      </div>
      <hr className="w-full text-mainBlack" />
      <Link to="/dashboard" className="w-full">
        <DashboardButton
          selected={selected === "all"}
          onClick={() => setSelected("all")}
        >
          <DashboardSvg className="w-8" />
          <span className="font-semibold">Todos</span>
        </DashboardButton>
      </Link>
      <Link to="/dashboard/cards" className="w-full">
        <DashboardButton
          selected={selected === "cards"}
          onClick={() => setSelected("cards")}
        >
          <CardSvg className="w-8" />
          <span className="font-semibold">Cards</span>
        </DashboardButton>
      </Link>
      <Link to="/dashboard/charts" className="w-full">
        <DashboardButton
          selected={selected === "charts"}
          onClick={() => setSelected("charts")}
        >
          <ChartSvg className="w-8" />
          <span className="font-semibold">Gráficos</span>
        </DashboardButton>
      </Link>
    </aside>
  );
}
export default Aside;