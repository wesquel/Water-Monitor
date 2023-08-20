import { useContext } from "react";
import { DashboardSelectContext } from "../../context/DashboardSelectContext";

export function SelectDropdownItem({ children, value, setShow }) {
  const { setDashboardSelected } = useContext(DashboardSelectContext);
  const setItem = (value) => {
    value = value.target.getAttribute("value");
    if (value !== null && typeof value !== "undefined") {
      setDashboardSelected(value);
      setShow(false);
    }
  };
  return (
    <span
      onClick={setItem}
      value={value}
      className="hover:text-mainBlack cursor-pointer select-none"
    >
      {children}
    </span>
  );
}
