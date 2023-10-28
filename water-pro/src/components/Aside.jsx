import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactComponent as Avatar } from "../assets/avatar.svg";
import { ReactComponent as Service } from "../assets/service.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { ReactComponent as CardSvg } from "../assets/card.svg";
import { ReactComponent as DashboardSvg } from "../assets/dashboard.svg";
import { ReactComponent as ChartSvg } from "../assets/chart.svg";
import DashboardButton from "./DashboardButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { SelectDropdown } from "./selectDropdown";
import MeunuHamburguer from "./MenuHamburguer";

function Aside({ className }) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState(null);
  const { getUser, logout } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(getUser()));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    let urlPage = window.location.href;
    if (urlPage.includes("service")) {
      setSelected("service");
    } else if (urlPage.includes("cards")) {
      setSelected("cards");
    } else if (urlPage.includes("charts")) {
      setSelected("charts");
    } else {
      setSelected("all");
    }
  }, []);

  function handleSelected(select) {
    setSelected(select);
    setShowModal(false);
  }

  return (
    <MeunuHamburguer showModal={showModal} setShowModal={setShowModal}>
      <aside
        className={twMerge(
          "w-full lg:w-[270px] h-screen bg-secondBlack flex flex-col items-center py-14 px-5 gap-3 fixed",
          className
        )}
      >
        <Avatar />
        <span className="text-mainWhite">{user && user.username}</span>
        <div className="flex gap-4 items-center">
          <Link to="/dashboard/service/user">
            <Service
              style={{ color: selected === "service" ? "#00A6FB" : "" }}
              onClick={() => handleSelected("service")}
              className="w-6 cursor-pointer text-mainWhite hover:text-mainBlue transition-colors"
            />
          </Link>
          <Logout
            className="w-6 cursor-pointer text-mainWhite hover:text-mainBlue transition-colors"
            onClick={handleLogout}
          />
        </div>
        <hr className="w-full border-mainBlack" />
        <SelectDropdown.Root>
          <SelectDropdown.Item closeModal={setShowModal} value="caixa">
            Caixa de água
          </SelectDropdown.Item>
          <SelectDropdown.Item closeModal={setShowModal} value="medio">
            Ensino médio
          </SelectDropdown.Item>
        </SelectDropdown.Root>
        <Link to="/dashboard" className="w-full">
          <DashboardButton
            selected={selected === "all"}
            onClick={() => handleSelected("all")}
          >
            <DashboardSvg className="w-8" />
            <span className="font-semibold">Todos</span>
          </DashboardButton>
        </Link>
        <Link to="/dashboard/cards" className="w-full">
          <DashboardButton
            selected={selected === "cards"}
            onClick={() => handleSelected("cards")}
          >
            <CardSvg className="w-8" />
            <span className="font-semibold">Cards</span>
          </DashboardButton>
        </Link>
        <Link to="/dashboard/charts" className="w-full">
          <DashboardButton
            selected={selected === "charts"}
            onClick={() => handleSelected("charts")}
          >
            <ChartSvg className="w-8" />
            <span className="font-semibold">Gráficos</span>
          </DashboardButton>
        </Link>
      </aside>
    </MeunuHamburguer>
  );
}
export default Aside;
