import { Link } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as Persons } from "../assets/person.2.svg";
import { ReactComponent as Password } from "../assets/password.svg";
import { useEffect, useState } from "react";

function MenuService() {
  const [selected, setSelected] = useState("");
  useEffect(() => {
    let urlPage = window.location.href;
    if (urlPage.includes("users")) {
      setSelected("users");
    } else if (urlPage.includes("user")) {
      setSelected("user");
    } else if (urlPage.includes("changepassword")) {
      setSelected("password");
    }
  }, []);

  return (
    <div className="border-mainBlack border-b lg:border-b-0 lg:border-r pb-2 lg:pr-6 flex lg:flex-col gap-4">
      <Link to="/dashboard/service/user" className="w-full">
        <DashboardButton
          selected={selected === "user"}
          onClick={() => setSelected("user")}
          className="justify-center flex lg:block"
        >
          <Person className="w-8 h-8" />
          <span className="font-semibold hidden lg:block">Meu Usuário</span>
        </DashboardButton>
      </Link>
      <Link to="/dashboard/service/changepassword" className="w-full">
        <DashboardButton
          selected={selected === "password"}
          onClick={() => setSelected("password")}
          className="justify-center flex lg:block"
        >
          <Password className="w-8 h-8" />
          <span className="font-semibold hidden lg:block">Mudar Senha</span>
        </DashboardButton>
      </Link>
      <Link to="/dashboard/service/users" className="w-full">
        <DashboardButton
          selected={selected === "users"}
          onClick={() => setSelected("users")}
          className="justify-center flex lg:block"
        >
          <Persons className="w-8 h-8" />
          <span className="font-semibold hidden lg:block">
            Gerenciar Usuários
          </span>
        </DashboardButton>
      </Link>
    </div>
  );
}

export default MenuService;
