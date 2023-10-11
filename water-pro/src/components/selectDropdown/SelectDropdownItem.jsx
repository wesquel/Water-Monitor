import { useContext } from "react";
import { DashboardSelectContext } from "../../context/DashboardSelectContext";

export function SelectDropdownItem({ children, value, setShow, openModal }) {
  const { setDashboardSelected } = useContext(DashboardSelectContext);
  const setItem = (value) => {
    value = value.target.getAttribute("value");
    if (value !== null && typeof value !== "undefined") {
      openModal(false);
      setDashboardSelected(value);
      setShow(false);
    }
  };
  return (
    <span
      onClick={setItem}
      value={value}
      className="cursor-pointer select-none p-4 hover:bg-mainBlueHover"
    >
      {children}
    </span>
  );
}
