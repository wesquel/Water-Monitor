import React, { useContext, useEffect, useRef, useState } from "react";
import { DashboardSelectContext } from "../../context/DashboardSelectContext";
import { twMerge } from "tailwind-merge";
import { ReactComponent as DownArrow } from "../../assets/downArrow.svg";

export function SelectDropdownRoot({ children, className }) {
  const { dashboardSelected } = useContext(DashboardSelectContext);
  const [show, setShow] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        setShow,
      });
    });
  };
  return (
    <div className="w-full relative">
      <div
        className={twMerge(
          "text-mainWhite px-6 py-2 w-full font-semibold text-sm rounded-lg select-none border border-mainBlue flex justify-between items-center",
          className
        )}
      >
        {dashboardSelected === "caixa" && "Caixa de água"}
        {dashboardSelected === "medio" && "Ensino médio"}
        <div ref={menuRef}>
          <DownArrow
            className={twMerge(
              "w-6 h-6 cursor-pointer transition-transform duration-300",
              show ? "transform rotate-[-180deg]" : "transform-none"
            )}
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
      <div
        className={twMerge(
          "bg-mainBlue rounded-lg flex flex-col text-mainWhite overflow-hidden absolute w-full top-12 gap-3 shadow-md transition-opacity ease-in-out duration-300",
          show
            ? "opacity-100 "
            : "opacity-0  invisible transition-all duration-300"
        )}
      >
        {renderChildren()}
      </div>
    </div>
  );
}
