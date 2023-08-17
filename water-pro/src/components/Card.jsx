import { twMerge } from "tailwind-merge";

function Card({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={twMerge(
        "w-full min-h-[120px] rounded-xl bg-secondBlack flex",
        className
      )}
    >
      <div className="p-2 w-full justify-around grid grid-cols-2 grid-rows-1 items-center gap-6 text-mainWhite">
        {children}
      </div>
    </div>
  );
}

export default Card;
