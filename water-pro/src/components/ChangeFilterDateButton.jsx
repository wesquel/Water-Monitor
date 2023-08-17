import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
function ChangeFilterDateButton({ className }) {
  const [selected, setSelected] = useState("week");
  return (
    <div
      className={twMerge(
        "lg:col-start-4 h-10 w-full lg:w-52 rounded-xl flex cursor-pointer select-none justify-self-end",
        className
      )}
    >
      <div
        className={twMerge(
          "h-full w-full rounded-s-xl transition-colors flex items-center justify-center text-mainWhite",
          selected === "week" ? "bg-mainBlue font-bold" : "bg-secondBlack"
        )}
        onClick={() => setSelected("week")}
      >
        Semana
      </div>
      <div
        className={twMerge(
          "h-full w-full rounded-e-xl transition-colors flex items-center justify-center text-mainWhite",
          selected === "today" ? "bg-mainBlue font-bold" : "bg-secondBlack"
        )}
        onClick={() => setSelected("today")}
      >
        hoje
      </div>
    </div>
  );
}
export default ChangeFilterDateButton;
