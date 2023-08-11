import React from "react";
import { twMerge } from "tailwind-merge";
function Container({ children, className }) {
  return (
    <div className={twMerge("sm:px-[14%] px-3", className)}>{children}</div>
  );
}
export default Container;
