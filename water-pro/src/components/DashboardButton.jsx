import { twMerge } from "tailwind-merge";

function DashboardButton({ children, className, selected, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        ` text-mainBlack px-6 py-2 w-full font-semibold text-sm rounded-lg select-none hover:bg-mainBlue  transition-colors duration-300`,
        selected ? "bg-mainBlue" : "bg-none",
        className
      )}
    >
      <div className="flex items-center gap-6 text-mainWhite">{children}</div>
    </button>
  );
}

export default DashboardButton;
