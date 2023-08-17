import React from "react";
import { twMerge } from "tailwind-merge";

function Aside({ className }) {
  return (
    <aside
      className={twMerge("w-[300px] h-screen bg-secondBlack", className)}
    ></aside>
  );
}
export default Aside;
