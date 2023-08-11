import { twMerge } from "tailwind-merge";

function Button({ children, className, variant, ...props }) {
  return variant === "outlined" ? (
    <button
      {...props}
      className={twMerge(
        "bg-mainBlack text-mainWhite px-8 py-3 font-semibold text-sm rounded-lg border-2 border-mainWhite hover:border-mainBlue hover:text-mainBlue  transition-colors duration-300",
        className
      )}
    >
      {children}
    </button>
  ) : (
    <button
      {...props}
      className={twMerge(
        "bg-mainWhite text-mainBlack px-8 py-3 font-semibold text-sm rounded-lg  hover:bg-mainBlue  transition-colors duration-300",
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
